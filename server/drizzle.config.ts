import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import env from "@/env";

export default defineConfig({
  out: "./drizzle",
  dialect: "postgresql",
  schema: "./src/db/models/**/*.ts",
  dbCredentials: {
    url: env.DB_URL,
  },
});
