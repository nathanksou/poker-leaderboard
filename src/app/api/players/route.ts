import { NextResponse } from "next/server";
import { readData } from "@/lib/storage";

export async function GET() {
  try {
    const data = await readData();
    const players = Object.values(data.players).map(
      ({ name, gamesPlayed, firstPlace, secondPlace, buyIns }) => ({
        name,
        gamesPlayed,
        firstPlace,
        secondPlace,
        buyIns,
      })
    );

    return NextResponse.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json(
      { error: "Failed to fetch players" },
      { status: 500 }
    );
  }
}
