import express from "express";
import {
  createUserController,
  deletedUserController,
  getAllUserController,
  getUserByIdController,
  updatedUserController,
} from "../controller/users/user.controller";
import { authentication, isAdmin } from "../middleware/authentication";
import { validateData } from "../middleware/validateZod";
import { UserSchema, UserUpdateSchema } from "../schemas/user";

const userRouter = express.Router();

userRouter.get("", getAllUserController);
userRouter.get("/:id", getUserByIdController);

userRouter.use(authentication, isAdmin);
userRouter.post("/create", validateData(UserSchema), createUserController);
userRouter.patch("/:id", validateData(UserUpdateSchema), updatedUserController);
userRouter.delete("/:id", deletedUserController);

export default userRouter;
