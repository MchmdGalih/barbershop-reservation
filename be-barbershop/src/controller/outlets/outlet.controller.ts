import { NextFunction, Request, Response } from "express";
import {
  getAllOutletService,
  getOutletByIdService,
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

export { getAllOutletController, getOutletByIdController };
