import { tr } from "zod/v4/locales";
import { AppErrors } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import { BarberInput, BarberUpdateInput } from "../../types/barber";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "../../utils/cloudinary";

const getAllBarberService = async () => {
  const barbers = await prisma.barber.findMany({
    select: {
      id: true,
      name_barber: true,
      image: true,
      outlet: {
        select: {
          name: true,
          address: true,
          city: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  return barbers;
};

const getBarberByIdService = async (id: string) => {
  const barber = await prisma.barber.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name_barber: true,
      image: true,
      outlet: {
        select: {
          name: true,
          address: true,
          city: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  if (!barber) throw new AppErrors(404, "Barber not found!");

  return barber;
};

const createBarberService = async (
  payload: BarberInput,
  file: Express.Multer.File,
) => {
  if (!file) throw new AppErrors(404, "Barber image is required!");

  const { secure_url, public_id } = await uploadImageToCloudinary(file);

  const barber = await prisma.barber.create({
    data: {
      name_barber: payload.name_barber,
      outletId: payload.outletId,
      image: secure_url,
      public_id: public_id,
    },
  });

  return barber;
};

const updateBarberService = async (
  id: string,
  payload: BarberUpdateInput,
  file?: Express.Multer.File,
) => {
  const { outletId, ...updateBarber } = payload;

  const existingBarber = await prisma.barber.findFirst({
    where: { id },
    select: { image: true, public_id: true },
  });

  if (!existingBarber) throw new AppErrors(404, "Barber not found!");

  let imageUrl = existingBarber.image;
  let publicId = existingBarber.public_id;

  if (file) {
    if (publicId) {
      await deleteImageFromCloudinary(publicId);
    }

    const { secure_url, public_id } = await uploadImageToCloudinary(file);
    publicId = public_id;
    imageUrl = secure_url;
  }

  const barber = await prisma.barber.update({
    where: {
      id,
    },

    data: {
      ...updateBarber,
      ...(imageUrl && { image: imageUrl }),
      ...(publicId && { public_id: publicId }),
      ...(outletId && {
        outlet: {
          connect: {
            id: outletId,
          },
        },
      }),
    },
  });
  return barber;
};

const deleteBarberService = async (id: string) => {
  const barberId = await prisma.barber.findFirst({
    where: {
      id,
    },
  });

  if (!barberId) throw new AppErrors(404, "Barber not found!");

  if (barberId.public_id) await deleteImageFromCloudinary(barberId.public_id);

  return await prisma.barber.delete({
    where: {
      id,
    },
  });
};

export {
  getAllBarberService,
  getBarberByIdService,
  createBarberService,
  updateBarberService,
  deleteBarberService,
};
