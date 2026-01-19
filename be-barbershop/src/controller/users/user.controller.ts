import { Request, Response } from "express";
import {
  createUserService,
  deleteUserService,
  getAllUserService,
  getUserByIdService,
  updateUserService,
} from "../../service/users/user.service";

const getAllUserController = async (req: Request, res: Response) => {
  try {
    const users = await getAllUserService();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserByIdController = async (req: Request, res: Response) => {
  try {
    const user = await getUserByIdService(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const createUserController = async (req: Request, res: Response) => {
  try {
    const user = await createUserService(req.body);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const updatedUserController = async (req: Request, res: Response) => {
  try {
    const user = await updateUserService(req.params.id as string, req.body);

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
  }
};

const deletedUserController = async (req: Request, res: Response) => {
  try {
    await deleteUserService(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllUserController,
  getUserByIdController,
  createUserController,
  updatedUserController,
  deletedUserController,
};
