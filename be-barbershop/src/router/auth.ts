import express from "express";
import {
  loginController,
  registerController,
} from "../controller/auth/auth.controller";
import { validateData } from "../middleware/validateZod";
import { LoginSchema, RegisterSchema } from "../schemas/auth";

const authRouter = express.Router();

authRouter.post("/register", validateData(RegisterSchema), registerController);
authRouter.post("/login", validateData(LoginSchema), loginController);

export default authRouter;
