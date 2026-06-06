import z from "zod";

export const weightsSchema = z.object({
  weight: z.number(),
});
