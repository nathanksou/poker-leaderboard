import { NextResponse } from "next/server";
import { readData } from "@/lib/storage";

export async function GET() {
  try {
    const data = await readData();
    return NextResponse.json(data.games);
  } catch (error) {
    console.error("Error fetching games:", error);
    return NextResponse.json(
      { error: "Failed to fetch games" },
      { status: 500 }
    );
  }
}
