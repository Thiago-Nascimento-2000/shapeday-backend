import z from "zod";

export const ProfileSchema = z.object({
  name: z.string(),
  height: z.coerce.number(),
  targetWeight: z.coerce.number(),
});
