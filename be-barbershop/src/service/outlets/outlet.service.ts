import { AppErrors } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import { OutletInput, OutletUpdateInput } from "../../types/outlet";
import {
  deleteImageFromCloudinary,
  uploadImageToCloudinary,
} from "../../utils/cloudinary";

const getAllOutletService = async () => {
  const outlets = await prisma.outlet.findMany({
    select: {
      id: true,
      name: true,
      outlet_image: true,
      address: true,
      city: {
        select: {
          name: true,
        },
      },
    },
  });

  return outlets;
};

const getOutletByIdService = async (id: string) => {
  const outlet = await prisma.outlet.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      outlet_image: true,
      city: {
        select: {
          name: true,
        },
      },
      barber: {
        select: {
          name_barber: true,
        },
      },
    },
  });

  if (!outlet) throw new AppErrors(404, "Outlet not found!");

  return outlet;
};

const createOutletService = async (
  payload: OutletInput,
  file: Express.Multer.File,
) => {
  if (!file) throw new AppErrors(400, "Outlet image is required!");

  const { secure_url, public_id } = await uploadImageToCloudinary(file);

  const outlet = await prisma.outlet.create({
    data: {
      name: payload.name,
      address: payload.address,
      cityId: payload.cityId,
      outlet_image: secure_url,
      public_id: public_id,
    },
  });

  return outlet;
};

const updateOutletService = async (
  id: string,
  payload: OutletUpdateInput,
  file?: Express.Multer.File,
) => {
  const existingOutlet = await prisma.outlet.findFirst({
    where: {
      id,
    },
    select: {
      outlet_image: true,
      public_id: true,
    },
  });

  if (!existingOutlet) throw new AppErrors(404, "Outlet not found!");

  let publicId = existingOutlet.public_id;
  let outletImage = existingOutlet.outlet_image;

  if (file) {
    if (publicId) {
      await deleteImageFromCloudinary(publicId);
    }

    const { secure_url, public_id } = await uploadImageToCloudinary(file);
    publicId = public_id;
    outletImage = secure_url;
  }

  const updatedOutlet = await prisma.outlet.update({
    where: {
      id,
    },
    data: {
      ...payload,
      outlet_image: outletImage,
      public_id: publicId,
    },
  });

  return updatedOutlet;
};

const deleteOutletService = async (id: string) => {
  const outlet = await prisma.outlet.findFirst({
    where: {
      id,
    },
    select: {
      public_id: true,
    },
  });

  if (!outlet) {
    throw new AppErrors(404, "Outlet not found!");
  }

  if (outlet.public_id) await deleteImageFromCloudinary(outlet.public_id);

  return await prisma.outlet.delete({
    where: {
      id,
    },
  });
};

export {
  getAllOutletService,
  getOutletByIdService,
  createOutletService,
  updateOutletService,
  deleteOutletService,
};
