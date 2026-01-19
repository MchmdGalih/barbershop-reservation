import express from "express";
import {
  getAllOutletController,
  getOutletByIdController,
} from "../controller/outlets/outlet.controller";

const outletRouter = express.Router();

outletRouter.get("/", getAllOutletController);
outletRouter.get("/:id", getOutletByIdController);

export default outletRouter;
