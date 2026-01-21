import * as z from "zod";

export const OutletSchemas = z.object({
  name: z.string().min(3),
  address: z.string().min(3),
  cityId: z.string().min(3),
});

export const OutletUpdateSchemas = OutletSchemas.partial();
