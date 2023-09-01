import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const nodeEnd = z.enum(["development", "production"]);

const envSchema = z.object({
  DATABASE_HOST: z.string().default("localhost"),
  DATABASE_PORT: z.string().default("5432"),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_NAME: z.string(),
  NODE_ENV: nodeEnd.default("development").optional(),
  PORT_EXPRESS: z.string().default("5555"),
  PORT_TRPC: z.string().default("4444"),
});

export const env = envSchema.parse(process.env);
