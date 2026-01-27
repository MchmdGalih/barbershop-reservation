import { NextFunction, Request, Response } from "express";
import {
  createCityService,
  deleteCityService,
  getAllCityService,
  getCityByIdService,
  updateCityService,
} from "../../service/cities/cities.service";

const getAllCitiesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cities = await getAllCityService();

    res.status(200).json({
      success: true,
      message: "Cities fetched successfully",
      data: cities,
    });
  } catch (error) {
    next(error);
  }
};

const getCityByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const city = await getCityByIdService(req.params.id as string);
    res.status(200).json({
      success: true,
      message: "City fetched successfully",
      data: city,
    });
  } catch (error) {
    next(error);
  }
};

const createCityController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const city = await createCityService(req.body);
    res.status(201).json({
      success: true,
      message: "City created successfully",
      data: city,
    });
  } catch (error) {
    next(error);
  }
};

const updateCityController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cities = await updateCityService(req.params.id as string, req.body);
    res.status(200).json({
      success: true,
      message: "City updated successfully",
      data: cities,
    });
  } catch (error) {
    next(error);
  }
};

const deletedCityController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await deleteCityService(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "City deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export {
  getAllCitiesController,
  getCityByIdController,
  createCityController,
  updateCityController,
  deletedCityController,
};
