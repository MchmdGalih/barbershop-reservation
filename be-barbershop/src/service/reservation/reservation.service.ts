import { prisma } from "../../lib/prisma";

const getAllReservationService = async () => {
  const reservationToday = await prisma.reservation.findMany({
    where: {
      createdAt: {
        gte: new Date(),
        lte: new Date(new Date().setDate(new Date().getDate() + 1)),
      },
    },
  });

  return reservationToday;
};

const createReservationService = async (userId: any, payload: any) => {
  console.log(userId, payload);
};

export { getAllReservationService, createReservationService };
