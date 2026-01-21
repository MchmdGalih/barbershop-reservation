import express from "express";
import {
  createCityController,
  deletedCityController,
  getAllCitiesController,
  getCityByIdController,
  updateCityController,
} from "../controller/cities/cities.controller";
import { validateData } from "../middleware/validateZod";
import { CitiesSchema } from "../schemas/cities";
import { authentication, isAdmin } from "../middleware/authentication";

const citiesRouter = express.Router();

citiesRouter.get("", getAllCitiesController);
citiesRouter.get("/:id", getCityByIdController);

citiesRouter.use(authentication, isAdmin);
citiesRouter.post("/create", validateData(CitiesSchema), createCityController);
citiesRouter.patch("/:id", validateData(CitiesSchema), updateCityController);
citiesRouter.delete("/:id", deletedCityController);

export default citiesRouter;
