import { NextFunction, Request, Response } from "express";
import { loginService, registerService } from "../../service/auth/auth.service";

const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const registeredUser = await registerService(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: registeredUser,
    });
  } catch (error) {
    next(error);
  }
};

const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authData = await loginService(req.body);
    res.status(200).json({
      success: true,
      message: "User logged in successfully",
      data: authData,
    });
  } catch (error) {
    next(error);
  }
};

export { registerController, loginController };
