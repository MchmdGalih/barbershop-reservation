import * as z from "zod";

export const OutletSchemas = z.object({
  name: z.string().min(3, "Name is required"),
  address: z.string().min(3, "Address is required"),
  cityId: z.string().min(3, "City is required"),
});

export const OutletUpdateSchemas = OutletSchemas.partial();
