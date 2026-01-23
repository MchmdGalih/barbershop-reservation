import { Request, Response, NextFunction } from "express";
import { AppErrors } from "../errors/AppError";
import { ZodError } from "zod";
import { Prisma } from "../../generated/prisma/client";

export const errorGlobalMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.issues.map((issue) => ({
        field: issue.path.join("."),
        message: issue.message,
      })),
    });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case "P2002": // Unique constraint failed
        return res.status(409).json({
          error: "Duplicate entry",
          meta: err.meta,
        });
      case "P2025": // Record not found
        return res.status(404).json({
          error: "Record not found",
          meta: err.meta,
        });
      default:
        return res.status(400).json({
          error: "Prisma request error",
          code: err.code,
          meta: err.meta,
        });
    }
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res.status(400).json({
      error: "Validation error in Prisma query",
      message: err.message,
    });
  }

  if (err instanceof AppErrors) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error!",
  });
};
