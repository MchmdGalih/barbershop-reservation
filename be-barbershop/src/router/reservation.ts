import express from "express";
import {
  createReservationController,
  getAllReservationController,
} from "../controller/reservation/reservation.controller";
import { validateData } from "../middleware/validateZod";
import { ReservationInput } from "../schemas/reservation";
import { authentication } from "../middleware/authentication";

const reservationRouter = express.Router();

reservationRouter.get("", getAllReservationController);
reservationRouter.post(
  "/create",
  authentication,
  validateData(ReservationInput),
  createReservationController,
);

export default reservationRouter;
