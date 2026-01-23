import { NextFunction, Request, Response } from "express";
import {
  createService,
  deleteService,
  getAllService,
  getServiceById,
  updateService,
} from "../../service/services/services.service";

const getAllServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const services = await getAllService();

    res.status(200).json({
      success: true,
      message: "Services feched successfully",
      data: services,
    });
  } catch (error) {
    next(error);
  }
};

const getServiceByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const service = await getServiceById(req.params.id as string);
    res.status(200).json({
      success: true,
      message: "Service fetched successfully",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

const createServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const service = await createService(req.body);
    res.status(201).json({
      success: true,
      message: "Create service successfully!",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

const updateServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const service = await updateService(req.params.id as string, req.body);

    res.status(200).json({
      success: true,
      message: "Update service successfully!",
      data: service,
    });
  } catch (error) {
    next(error);
  }
};

const deletedServiceController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await deleteService(req.params.id as string);

    res.status(200).json({
      success: true,
      message: "Deleted service successfully!",
    });
  } catch (error) {
    next(error);
  }
};
export {
  getAllServiceController,
  getServiceByIdController,
  createServiceController,
  updateServiceController,
  deletedServiceController,
};
