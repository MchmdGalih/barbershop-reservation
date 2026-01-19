import * as z from "zod";

export const CitiesSchema = z.object({
  name: z.string().min(3, "Name is required"),
});
