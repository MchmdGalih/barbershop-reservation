import * as z from "zod";

export const ServiceSchemas = z.object({
  name: z.string().min(3),
  price: z.coerce.number().min(0),
  duration: z.coerce.number().int().min(1),
});

export const ServiceUpdateSchemas = ServiceSchemas.partial();
