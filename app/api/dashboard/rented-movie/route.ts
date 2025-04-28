import { NextResponse } from "next/server";
import { drizzledb } from "@/db/drizzle"; // Your drizzle instance
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const result = await drizzledb.execute(
      sql`
        SELECT
          movie_title,
          DATE_TRUNC('month', rented_at) AS rented_month,
          COUNT(*) AS total_rentals
        FROM rented_movies
        GROUP BY movie_title, rented_month
        ORDER BY rented_month ASC, total_rentals DESC;
      `
    );

    return NextResponse.json({ success: true, data: result.rows });
  } catch (error: any) {
    console.error("Error fetching rented movies:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}