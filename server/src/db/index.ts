import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import env from "@/env";
import { schemas } from "./schema";
import { Pool } from "pg";

//connection pool
export const pool = new Pool({
  connectionString: env.DB_URL,
  max: 30,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});

export const db = drizzle(pool, {
  schema: schemas,
  casing: "snake_case",
});
