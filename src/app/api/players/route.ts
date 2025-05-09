import { NextResponse } from "next/server";
import { readData } from "@/lib/storage";

export async function GET() {
  try {
    const data = await readData();
    const players = Object.entries(data.players).map(([slackId, player]) => ({
      slackId,
      name: player.name,
      gamesPlayed: player.gamesPlayed,
      firstPlace: player.firstPlace,
      secondPlace: player.secondPlace,
      buyIns: player.buyIns,
    }));

    return NextResponse.json(players);
  } catch (error) {
    console.error("Error fetching players:", error);
    return NextResponse.json(
      { error: "Failed to fetch players" },
      { status: 500 }
    );
  }
}
