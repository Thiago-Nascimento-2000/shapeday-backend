import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const EnvSchema = z.object({
  // Application
  APPLICATION_PORT: z.coerce.number(),
  APPLICATION_URL: z.string().url(),
  // JWT
  JWT_SECRET: z.string().min(1),
  JWT_EXPIRES_IN: z.coerce.number(),
  // Database
  DATABASE_USER: z.string().min(1),
  DATABASE_PASSWORD: z.string().min(1),
  DATABASE_NAME: z.string().min(1),
  DATABASE_HOST: z.string().min(1),
  DATABASE_PORT: z.coerce.number(),
});

const ENV = EnvSchema.parse(process.env);

export default ENV;
