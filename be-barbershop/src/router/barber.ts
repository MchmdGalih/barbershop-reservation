import express from "express";
import {
  createBarberController,
  deleteBarberController,
  getAllBarberController,
  getBarberByIdController,
  updateBarberController,
} from "../controller/barber/barber.controller";
import { uploadFile } from "../middleware/uploaderMulter";
import { validateData } from "../middleware/validateZod";
import { BarberSchema, BarberUpdateSchema } from "../schemas/barber";
import { authentication, isAdmin } from "../middleware/authentication";

const barberRouter = express.Router();

barberRouter.get("", getAllBarberController);
barberRouter.get("/:id", getBarberByIdController);

barberRouter.use(authentication, isAdmin);

barberRouter.post(
  "/create",
  uploadFile.single("image"),
  validateData(BarberSchema),
  createBarberController,
);
barberRouter.patch(
  "/:id",
  uploadFile.single("image"),
  validateData(BarberUpdateSchema),
  updateBarberController,
);
barberRouter.delete("/:id", deleteBarberController);

export default barberRouter;
