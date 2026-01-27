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
    const reservation = await createReservationService(req.body);
    console.log(reservation, "--> controller");
  } catch (error) {
    console.log(error);
  }
};




export { createReservationController, getAllReservationController };
