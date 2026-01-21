import { NextFunction, Request, Response } from "express";
import {
  createOutletService,
  deleteOutletService,
  getAllOutletService,
  getOutletByIdService,
  updateOutletService,
} from "../../service/outlets/outlet.service";

const getAllOutletController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const outlets = await getAllOutletService();

    res.status(200).json({
      success: true,
      message: "Outlets fetched successfully",
      data: outlets,
    });
  } catch (error) {
    next(error);
  }
};

const getOutletByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const outlet = await getOutletByIdService(req.params.id as string);
    res.status(200).json({
      success: true,
      message: "Outlet fetched successfully",
      data: outlet,
    });
  } catch (error) {
    next(error);
  }
};

const createOutletController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const outlet = await createOutletService(
      req.body,
      req.file as Express.Multer.File,
    );
    res.status(201).json({
      success: true,
      message: "Outlet created successfully",
      data: outlet,
    });
  } catch (error) {
    next(error);
  }
};

const updateOutletController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const outlet = await updateOutletService(
      req.params.id as string,
      req.body,
      req.file as Express.Multer.File,
    );

    res.status(200).json({
      success: true,
      message: "Outlet updated successfully",
      data: outlet,
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteOutletController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await deleteOutletService(req.params.id as string);
    res.status(200).json({
      success: true,
      message: "Outlet deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  getAllOutletController,
  getOutletByIdController,
  createOutletController,
  updateOutletController,
  deleteOutletController,
};
