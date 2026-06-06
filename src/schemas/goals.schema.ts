import z from "zod";

export const goalsWaterSchema = z.object({
  targetWater: z.number(),
});

export const goalsWeightsSchema = z.object({
  targetWeight: z.number(),
});
