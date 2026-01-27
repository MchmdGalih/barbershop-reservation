import * as z from "zod";

export const ReservationInput = z.object({
  userId: z.string("userId is required"),
  outletId: z.string("outletId is required"),
  barberId: z.string("barberId is required"),
  startAt: z.coerce.date("startAt is required"),
  serviceId: z.array(z.string().uuid()).min(1),
});
