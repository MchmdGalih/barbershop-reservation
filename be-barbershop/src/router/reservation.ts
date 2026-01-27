import express from "express";
import {
  createReservationController,
  getAllReservationController,
} from "../controller/reservation/reservation.controller";
import { validateData } from "../middleware/validateZod";
import { ReservationInput } from "../schemas/reservation";

const reservationRouter = express.Router();

reservationRouter.get("", getAllReservationController);
reservationRouter.post(
  "/create",
  validateData(ReservationInput),
  createReservationController,
);

export default reservationRouter;
