import express from "express";
import {
  createReservationController,
  getAllReservationController,
} from "../controller/reservation/reservation.controller";

const reservationRouter = express.Router();

reservationRouter.get("", getAllReservationController);
reservationRouter.post("/create", createReservationController);

export default reservationRouter;
