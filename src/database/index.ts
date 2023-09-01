import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import { env } from "../config/env";
import * as schema from "./schema";

const poolClient = new Pool({
  host: env.DATABASE_HOST,
  port: Number(env.DATABASE_PORT),
  user: env.DATABASE_USER,
  password: env.DATABASE_PASSWORD,
  database: env.DATABASE_NAME,
});

export const database = drizzle(poolClient, { schema });
