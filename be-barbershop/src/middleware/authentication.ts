import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/jwt";
import type { JwtPayload } from "jsonwebtoken";
import { handleJwtError } from "../utils/handleJwtErr";

interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    email: string;
    role?: string;
  };
}

export const authentication = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.get("Authorization");

    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Missing authorization header",
      });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        success: false,
        message: "Invalid authorization format",
      });
    }

    const decoded = verifyToken(token) as JwtPayload;

    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return handleJwtError(error, res);
  }
};

export const isAdmin = async (req: any, res: Response, next: NextFunction) => {
  if (req.user?.role !== "admin") {
    return res
      .status(401)
      .json({ message: "You are not entitled to access this resource" });
  }
  next();
};
