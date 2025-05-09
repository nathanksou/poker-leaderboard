import { NextResponse } from "next/server";
import { Game } from "@/types";
import { getGames, saveGames } from "@/utils/games";

export async function PUT(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const gameId = params.gameId;
    const updatedGame: Game = await request.json();

    // Validate required fields
    if (
      !updatedGame.id ||
      !updatedGame.date ||
      !updatedGame.firstPlace ||
      !updatedGame.secondPlace ||
      !updatedGame.players
    ) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate players array
    if (
      !Array.isArray(updatedGame.players) ||
      updatedGame.players.length === 0
    ) {
      return NextResponse.json(
        { error: "At least one player is required" },
        { status: 400 }
      );
    }

    // Validate each player has required fields
    for (const player of updatedGame.players) {
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

    // Find and update the game by ID
    const gameIndex = games.findIndex((game) => game.id === gameId);

    if (gameIndex === -1) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    // Ensure the ID matches
    if (updatedGame.id !== gameId) {
      return NextResponse.json({ error: "Game ID mismatch" }, { status: 400 });
    }

    // Update the game without modifying the date format
    games[gameIndex] = updatedGame;

    // Save updated games
    await saveGames(games);

    return NextResponse.json(updatedGame);
  } catch (error) {
    console.error("Error updating game:", error);
    return NextResponse.json(
      { error: "Failed to update game" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const gameId = params.gameId;

    // Get existing games
    const games = await getGames();

    // Find and remove the game by ID
    const gameIndex = games.findIndex((game) => game.id === gameId);

    if (gameIndex === -1) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    games.splice(gameIndex, 1);

    // Save updated games
    await saveGames(games);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting game:", error);
    return NextResponse.json(
      { error: "Failed to delete game" },
      { status: 500 }
    );
  }
}
