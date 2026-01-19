import { Router } from "express";
import roleRouter from "./role";
import authRouter from "./auth";
import userRouter from "./users";
import citiesRouter from "./cities";
import outletRouter from "./outlets";
const router = Router();

router.use("/role", roleRouter);
router.use("/auth/", authRouter);
router.use("/user", userRouter);
router.use("/city", citiesRouter);
router.use("/outlet", outletRouter);

export default router;
