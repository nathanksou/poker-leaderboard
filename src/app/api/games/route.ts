import { NextResponse } from "next/server";
import { readData } from "@/lib/storage";
import { Game, ErrorResponse } from "@/types";

export async function GET() {
  try {
    const data = await readData();

    if (!Array.isArray(data.games)) {
      throw new Error("Invalid games data format");
    }

    const games = data.games.map((game: Game) => ({
      ...game,
      date: new Date(game.date).toISOString(),
    }));

    return NextResponse.json(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    const errorResponse: ErrorResponse = { error: "Failed to fetch games" };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
