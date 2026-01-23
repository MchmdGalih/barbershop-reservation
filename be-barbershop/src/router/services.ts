import express from "express";
import {
  createServiceController,
  deletedServiceController,
  getAllServiceController,
  getServiceByIdController,
  updateServiceController,
} from "../controller/services/services.controler";
import { validateData } from "../middleware/validateZod";
import { ServiceSchemas, ServiceUpdateSchemas } from "../schemas/service";
import { authentication, isAdmin } from "../middleware/authentication";

const serviceRouter = express.Router();

serviceRouter.get("", getAllServiceController);
serviceRouter.get("/:id", getServiceByIdController);

serviceRouter.use(authentication, isAdmin);
serviceRouter.post(
  "/create",
  validateData(ServiceSchemas),
  createServiceController,
);
serviceRouter.patch(
  "/:id",
  validateData(ServiceUpdateSchemas),
  updateServiceController,
);
serviceRouter.delete("/:id", deletedServiceController);

export default serviceRouter;
