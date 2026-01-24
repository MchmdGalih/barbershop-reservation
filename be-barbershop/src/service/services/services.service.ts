import { AppErrors } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import { ServiceInput, ServiceUpdateInput } from "../../types/services";

const getAllService = async () => {
  const services = await prisma.service.findMany();

  return services;
};

const getServiceById = async (id: string) => {
  const service = await prisma.service.findUnique({
    where: {
      id,
    },
  });

  if (!service) throw new AppErrors(404, "Service not found!");

  return service;
};

const createService = async (payload: ServiceInput) => {
  const service = await prisma.service.create({
    data: {
      name: payload.name,
      price: payload.price,
      duration: payload.duration,
    },
  });

  return service;
};

const updateService = async (id: string, payload: ServiceUpdateInput) => {
  const update = await prisma.service.update({
    where: { id },
    data: {
      ...(payload.name && { name: payload.name }),
      ...(payload.price && { price: payload.price }),
      ...(payload.duration && { duration: payload.duration }),
    },
  });

  return update;
};

const deleteService = async (id: string) => {
  return await prisma.service.delete({
    where: {
      id,
    },
  });
};

export {
  getAllService,
  getServiceById,
  createService,
  updateService,
  deleteService,
};
