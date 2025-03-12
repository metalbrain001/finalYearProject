import { registrations } from "@/db/schema";
import { hash } from "bcryptjs";
import fs from "fs";
import path from "path";
import { config } from "dotenv";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";

config({ path: ".env" });

// ✅ PostgreSQL connection setup with Drizzle
const pool = new Pool({ connectionString: process.env.NEXT_PUBLIC_DB_URL });
const db = drizzle(pool);

export default async function seed() {
  try {
    console.log("🌱 Checking for existing users...");

    // ✅ Read dummy user data from JSON file
    const filePath = path.join(__dirname, "dummyuser.json");
    const fileData = fs.readFileSync(filePath, "utf8");
    const dummyRegistrations = JSON.parse(fileData);

    let newUsers = [];

    for (const user of dummyRegistrations) {
      const existingUser = await db
        .select()
        .from(registrations)
        .where(eq(registrations.email, user.email))
        .execute();

      if (existingUser.length === 0) {
        newUsers.push(user);
      }
    }

    if (newUsers.length === 0) {
      console.log("✅ All users already exist. No new users to seed.");
      return;
    }

    console.log("🌱 Seeding users...");

    // ✅ Hash passwords for all users
    const hashedPassword = await hash("{Xa'V@#|Pi%9", 10); // Default password

    // ✅ Prepare users data for insertion
    const usersToInsert = dummyRegistrations.map((user: any) => ({
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      password: hashedPassword, // ✅ Secure password
      role: user.role as "user" | "admin" | "superadmin", // ✅ Explicit type assertion
      createdAt: new Date(user.createdAt), // ✅ Convert string to Date
    }));

    // ✅ Insert all users into the database
    const inserted_data = await db.insert(registrations).values(usersToInsert).execute();
    console.log(inserted_data);

    console.log("✅ Dummy users seeded successfully!");
  } catch (error) {
    console.error("❌ Error seeding users:", error);
  } finally {
    await pool.end(); // ✅ Close DB connection after seeding
  }
}

// Execute the script
seed().then(() => console.log("🌱 Seeding process finished!"));