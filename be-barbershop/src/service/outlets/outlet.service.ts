import { AppErrors } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";

const getAllOutletService = async () => {
  const outlets = await prisma.outlet.findMany({
    select: {
      id: true,
      name: true,
      outlet_image: true,
      public_id: true,
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
  const outlet = await prisma.outlet.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      outlet_image: true,
      public_id: true,
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

const deleteOutletService = async (id: string) => {
  return await prisma.outlet.delete({
    where: {
      id,
    },
  });
};

export { getAllOutletService, getOutletByIdService, deleteOutletService };
