import { NextFunction, Request, Response } from "express";
import {
  createReservationService,
  getAllReservationService,
} from "../../service/reservation/reservation.service";

const getAllReservationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reservation = await getAllReservationService();
    res.status(200).json({
      success: true,
      message: "Reservation fetched successfully",
      data: reservation,
    });
  } catch (error) {
    next(error);
  }
};

const createReservationController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id as string;

    const reservation = await createReservationService(userId, req.body);
    res.status(201).json({
      success: true,
      message: "Reservation created successfully",
      data: reservation,
    });
  } catch (error) {
    console.log(error);
  }
};

export { createReservationController, getAllReservationController };
