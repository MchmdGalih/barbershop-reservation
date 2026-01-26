import { Router } from "express";
import roleRouter from "./role";
import authRouter from "./auth";
import userRouter from "./users";
import citiesRouter from "./cities";
import outletRouter from "./outlets";
import barberRouter from "./barber";
import serviceRouter from "./services";
import reservationRouter from "./reservation";
const router = Router();

router.use("/role", roleRouter);
router.use("/auth/", authRouter);
router.use("/user", userRouter);
router.use("/city", citiesRouter);
router.use("/outlet", outletRouter);
router.use("/barber", barberRouter);
router.use("/service", serviceRouter);
router.use("/reservation", reservationRouter);

export default router;
