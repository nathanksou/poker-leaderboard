import { Game } from "@/types";
import { readData, writeData } from "@/lib/storage";

export async function getGames(): Promise<Game[]> {
  const data = await readData();
  return data.games.map((game) => ({
    ...game,
    players: game.players.map((player) => ({
      ...player,
      placement:
        player.slackId === game.firstPlace
          ? "first"
          : player.slackId === game.secondPlace
          ? "second"
          : "other",
    })),
  }));
}

export async function saveGames(games: Game[]): Promise<void> {
  const data = await readData();
  data.games = games;
  await writeData(data);
}

export async function updateGame(
  gameId: string,
  updatedGame: Game
): Promise<void> {
  const data = await readData();
  const gameIndex = data.games.findIndex((g) => g.id === gameId);

  if (gameIndex === -1) {
    throw new Error("Game not found");
  }

  const oldGame = data.games[gameIndex];
  const now = new Date().toISOString();

  // Remove old game's impact on player statistics
  oldGame.players.forEach((player) => {
    if (data.players[player.slackId]) {
      const existingPlayer = data.players[player.slackId];
      existingPlayer.gamesPlayed -= 1;
      existingPlayer.buyIns -= player.buyIns;
      if (player.placement === "first") {
        existingPlayer.firstPlace -= 1;
      } else if (player.placement === "second") {
        existingPlayer.secondPlace -= 1;
      }
      existingPlayer.lastUpdated = now;
    }
  });

  // Add new game's impact on player statistics
  updatedGame.players.forEach((player) => {
    const existingPlayer = data.players[player.slackId] || {
      slackId: player.slackId,
      name: player.slackId,
      gamesPlayed: 0,
      firstPlace: 0,
      secondPlace: 0,
      buyIns: 0,
      lastUpdated: now,
    };

    existingPlayer.gamesPlayed += 1;
    existingPlayer.buyIns += player.buyIns;
    if (player.placement === "first") {
      existingPlayer.firstPlace += 1;
    } else if (player.placement === "second") {
      existingPlayer.secondPlace += 1;
    }
    existingPlayer.lastUpdated = now;

    data.players[player.slackId] = existingPlayer;
  });

  // Update the game
  data.games[gameIndex] = updatedGame;

  await writeData(data);
}
