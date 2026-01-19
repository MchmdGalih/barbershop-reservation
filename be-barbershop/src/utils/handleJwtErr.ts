import jwt from "jsonwebtoken";
import { Response } from "express";

export const handleJwtError = (error: unknown, res: Response) => {
  if (error instanceof jwt.TokenExpiredError) {
    return res.status(401).json({
      message: "Token expired",
    });
  }

  if (error instanceof jwt.JsonWebTokenError) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  return res.status(500).json({
    message: "Internal server error",
  });
};
