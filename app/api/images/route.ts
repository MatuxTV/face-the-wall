import { NextResponse } from "next/server";
import pool from "../pg";

export async function GET() {
  try {
    const result = await pool.query('SELECT * FROM "face-the-wall"');
    return NextResponse.json(result.rows);
  } catch (error) {
    return NextResponse.json({ error: "Error while fetching images" }, { status: 500 });
  }
}