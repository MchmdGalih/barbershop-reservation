import { NextFunction, Request, Response } from "express";
import {
  createRoleService,
  deleteRoleService,
  getRoleByIdService,
  getRoleService,
  updateRoleService,
} from "../../service/role/role.service";

const createRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const role = await createRoleService(req.body);
    res.status(201).json({
      success: true,
      message: "Role created successfully",
      data: role,
    });
  } catch (error) {
    next(error);
  }
};

const getAllRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const roles = await getRoleService();
    res.status(200).json({
      success: true,
      message: "Roles fetched successfully",
      data: roles,
    });
  } catch (error) {
    next(error);
  }
};

const getRoleByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const role = await getRoleByIdService(req.params.id as string);
    res.status(200).json({
      success: true,
      message: "Role fetched successfully",
      data: role,
    });
  } catch (error) {
    next(error);
  }
};

const updateRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const role = await updateRoleService(req.params.id as string, req.body);

    res.status(200).json({
      success: true,
      message: "Role updated successfully",
      data: role,
    });
  } catch (error) {
    next(error);
  }
};

const deleteRoleController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await deleteRoleService(req.params.id as string);
    res.status(200).json({
      success: true,
      message: "Role deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  createRoleController,
  getAllRoleController,
  getRoleByIdController,
  updateRoleController,
  deleteRoleController,
};
