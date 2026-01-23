import { NextFunction, Request, Response } from "express";
import {
  createBarberService,
  deleteBarberService,
  getAllBarberService,
  getBarberByIdService,
  updateBarberService,
} from "../../service/barber/barber.service";

const getAllBarberController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const barbers = await getAllBarberService();

    res.status(200).json({
      success: true,
      message: "Barber fetched successfully",
      data: barbers,
    });
  } catch (error) {
    next(error);
  }
};

const getBarberByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const barber = await getBarberByIdService(req.params.id as string);
    res.status(200).json({
      success: true,
      message: "Barber fetched successfully",
      data: barber,
    });
  } catch (error) {
    next(error);
  }
};

const createBarberController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const barber = await createBarberService(
      req.body,
      req.file as Express.Multer.File,
    );
    res.status(201).json({
      success: true,
      message: "Barber created successfully",
      data: barber,
    });
  } catch (error) {
    next(error);
  }
};

const updateBarberController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const barber = await updateBarberService(
      req.params.id as string,
      req.body,
      req.file as Express.Multer.File,
    );

    res.status(200).json({
      success: true,
      message: "Barber updated successfully",
      data: barber,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBarberController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await deleteBarberService(req.params.id as string);
  } catch (error) {
    next(error);
  }
};

export {
  getAllBarberController,
  getBarberByIdController,
  createBarberController,
  updateBarberController,
  deleteBarberController,
};
