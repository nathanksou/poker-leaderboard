import { NextResponse } from "next/server";
import { readData } from "@/lib/storage";
import { ErrorResponse } from "@/types";

export async function GET() {
  try {
    const data = await readData();
    const players = Object.entries(data.players).map(
      ([slackId, { name, gamesPlayed, firstPlace, secondPlace, buyIns }]) => ({
        slackId,
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
    const errorResponse: ErrorResponse = { error: "Failed to fetch players" };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
