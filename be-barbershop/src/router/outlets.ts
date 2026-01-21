import express from "express";
import {
  createOutletController,
  deleteOutletController,
  getAllOutletController,
  getOutletByIdController,
  updateOutletController,
} from "../controller/outlets/outlet.controller";
import { uploadFile } from "../middleware/uploaderMulter";

const outletRouter = express.Router();

outletRouter.get("/", getAllOutletController);
outletRouter.get("/:id", getOutletByIdController);
outletRouter.post("/create", uploadFile, createOutletController);
outletRouter.patch("/:id", uploadFile, updateOutletController);
outletRouter.delete("/:id", deleteOutletController);

export default outletRouter;
