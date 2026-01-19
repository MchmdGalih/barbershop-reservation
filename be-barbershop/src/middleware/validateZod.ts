import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

export const validateData =
  (schema: z.ZodSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsedData = schema.parse(req.body);
      req.body = parsedData;
      next();
    } catch (error) {
      next(error);
    }
  };
