import { NextResponse } from "next/server";
import { readData } from "@/lib/storage";
import { Game, ErrorResponse } from "@/types";
import { getGames, saveGames } from "@/utils/games";

export async function GET() {
  try {
    const data = await readData();

    if (!Array.isArray(data.games)) {
      throw new Error("Invalid games data format");
    }

    // Return games without modifying dates
    return NextResponse.json(data.games);
  } catch (error) {
    console.error("Error fetching games:", error);
    const errorResponse: ErrorResponse = { error: "Failed to fetch games" };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const game: Game = await request.json();

    // Validate required fields
    if (
      !game.id ||
      !game.date ||
      !game.firstPlace ||
      !game.secondPlace ||
      !game.players
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate players array
    if (!Array.isArray(game.players) || game.players.length === 0) {
      return NextResponse.json(
        { error: "At least one player is required" },
        { status: 400 }
      );
    }

    // Validate each player has required fields
    for (const player of game.players) {
      if (
        !player.slackId ||
        typeof player.buyIns !== "number" ||
        player.buyIns < 1
      ) {
        return NextResponse.json(
          {
            error:
              "Each player must have a valid slackId and at least one buy-in",
          },
          { status: 400 }
        );
      }
    }

    // Get existing games
    const games = await getGames();

    // Check if game ID already exists
    if (games.some((g) => g.id === game.id)) {
      return NextResponse.json(
        { error: "Game with this ID already exists" },
        { status: 400 }
      );
    }

    // Add new game
    games.push(game);

    // Save updated games
    await saveGames(games);

    return NextResponse.json(game);
  } catch (error) {
    console.error("Error adding game:", error);
    return NextResponse.json({ error: "Failed to add game" }, { status: 500 });
  }
}
