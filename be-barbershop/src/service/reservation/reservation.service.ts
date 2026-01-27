import { AppErrors } from "../../errors/AppError";
import { prisma } from "../../lib/prisma";
import { ReservationInput } from "../../types/reservation";
import { addMinutes } from "date-fns";
import { getTodayRangeUTC, TIME_ZONE } from "../../utils/date";
import { toZonedTime } from "date-fns-tz";

const getAllReservationService = async () => {
  const { startUTC, endUTC } = getTodayRangeUTC();

  const reservationToday = await prisma.reservation.findMany({
    where: {
      createdAt: {
        gte: startUTC,
        lte: endUTC,
      },
    },
  });

  return reservationToday;
};

const createReservationService = async (payload: ReservationInput) => {
  const { userId, outletId, barberId, startAt, serviceId } = payload;

  return await prisma.$transaction(async (tx) => {
    //1. ambil service
    const services = await tx.service.findMany({
      where: {
        id: {
          in: serviceId,
        },
      },
    });

    // 2. validasi serviceId
    if (services.length !== serviceId.length) {
      throw new AppErrors(404, "Service not found!");
    }

    // 3. hitung durasi
    const totalDuration = services.reduce(
      (sum, service) => service.duration + sum,
      0,
    );

    const endAt = addMinutes(startAt, totalDuration);

    // 4. cek conflict reservation barber.
    const conflictReservation = await tx.reservation.findFirst({
      where: {
        barberId,
        AND: [{ startAt: { lte: endAt } }, { endAt: { gte: startAt } }],
      },
    });

    if (conflictReservation) {
      throw new AppErrors(400, "Barber is currently unavailable at this time!");
    }

    // 5 buat reservation
    const reservation = await tx.reservation.create({
      data: {
        userId,
        outletId,
        barberId,
        startAt,
        endAt,
        status: "PENDING",
      },
      include: {
        user: true,
        barber: true,
      },
    });

    // 6. buat detail reservation.
    await tx.reservationService.createMany({
      data: services.map((service) => ({
        reservationId: reservation.id,
        serviceId: service.id,
      })),
    });

    return {
      ...reservation,
      startAt: toZonedTime(reservation.startAt, TIME_ZONE),
      endAt: toZonedTime(reservation.endAt, TIME_ZONE),
    };
  });
};

export { getAllReservationService, createReservationService };
