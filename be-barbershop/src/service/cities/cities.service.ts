import { AppErrors } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

interface CitiesInput {
  name: string;
}

const getAllCityService = async () => {
  const cities = await prisma.city.findMany({
    select: {
      id: true,
      name: true,
      outlet: true,
    },
  });

  return cities;
};

const getCityByIdService = async (id: string) => {
  const city = await prisma.city.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      outlet: true,
    },
  });

  if (!city) throw new AppErrors(401, "City not found!");

  return city;
};

const createCityService = async (payload: CitiesInput) => {
  const existingCity = await prisma.city.findFirst({
    where: {
      name: {
        equals: payload.name,
        mode: "insensitive",
      },
    },
  });

  if (existingCity) throw new AppErrors(403, "City already exists");

  const city = await prisma.city.create({
    data: {
      name: payload.name,
    },
  });

  return city;
};

const updateCityService = async (id: string, payload: CitiesInput) => {
  const city = await prisma.city.update({
    where: {
      id,
    },
    data: {
      name: payload.name,
    },
  });

  return city;
};

const deleteCityService = async (id: string) => {
  return await prisma.city.delete({
    where: {
      id,
    },
  });
};

export {
  getAllCityService,
  getCityByIdService,
  createCityService,
  updateCityService,
  deleteCityService,
};
