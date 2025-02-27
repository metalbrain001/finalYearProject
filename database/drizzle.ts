import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import config from "@/lib/config";

if (!config.env.databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const sql = neon(config.env.databaseUrl);
export const db = drizzle(sql);
