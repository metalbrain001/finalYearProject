import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import dotenv from "dotenv";
import config from "@/lib/config";

dotenv.config();

// PostgreSQL connection setup
const pool = new Pool({ connectionString: config.env.localDatabaseUrl });

export const drizzledb = drizzle(pool);
