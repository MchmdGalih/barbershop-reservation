import express from "express";
import {
  createOutletController,
  deleteOutletController,
  getAllOutletController,
  getOutletByIdController,
  updateOutletController,
} from "../controller/outlets/outlet.controller";
import { uploadFile } from "../middleware/uploaderMulter";
import { validateData } from "../middleware/validateZod";
import { OutletSchemas, OutletUpdateSchemas } from "../schemas/outlet";
import { authentication, isAdmin } from "../middleware/authentication";

const outletRouter = express.Router();

outletRouter.get("/", getAllOutletController);
outletRouter.get("/:id", getOutletByIdController);

outletRouter.use(authentication, isAdmin);

outletRouter.post(
  "/create",
  uploadFile.single("outlet_image"),
  validateData(OutletSchemas),
  createOutletController,
);
outletRouter.patch(
  "/:id",
  uploadFile.single("outlet_image"),
  validateData(OutletUpdateSchemas),
  updateOutletController,
);
outletRouter.delete("/:id", deleteOutletController);

export default outletRouter;
