import * as z from "zod";

export const BarberSchema = z.object({
  name_barber: z.string().min(3),
  outletId: z.string(),
});

export const BarberUpdateSchema = BarberSchema.partial();
