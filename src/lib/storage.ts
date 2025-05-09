import fs from "fs/promises";
import path from "path";
import { LeaderboardData, GamePlayer } from "@/types";

const DATA_FILE = path.join(process.cwd(), "data", "leaderboard.json");

export async function readData(): Promise<LeaderboardData> {
  try {
    const data = await fs.readFile(DATA_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    // If file doesn't exist or is invalid, return empty data structure
    return {
      players: {},
      games: [],
    };
  }
}

export async function writeData(data: LeaderboardData): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2));
}

export async function addGame(
  firstPlace: string,
  secondPlace: string,
  players: GamePlayer[]
): Promise<void> {
  const data = await readData();
  const now = new Date().toISOString();

  // Update players
  players.forEach((player) => {
    const existingPlayer = data.players[player.slackId] || {
      slackId: player.slackId,
      name: player.slackId, // Will be updated with real name from Slack
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

  // Add game
  data.games.push({
    date: now,
    players,
    firstPlace,
    secondPlace,
  });

  await writeData(data);
}

export async function updatePlayerName(
  slackId: string,
  name: string
): Promise<void> {
  const data = await readData();
  if (data.players[slackId]) {
    data.players[slackId].name = name;
    data.players[slackId].lastUpdated = new Date().toISOString();
    await writeData(data);
  }
}

export async function updateLastGameBuyins(
  slackId: string,
  buyIns: number
): Promise<void> {
  const data = await readData();
  if (data.games.length === 0) {
    throw new Error("No games found");
  }

  const lastGame = data.games[data.games.length - 1];
  const playerInGame = lastGame.players.find((p) => p.slackId === slackId);

  if (!playerInGame) {
    throw new Error("Player not found in last game");
  }

  // Update the difference in buy-ins
  const buyInDiff = buyIns - playerInGame.buyIns;
  playerInGame.buyIns = buyIns;

  // Update total buy-ins for the player
  if (data.players[slackId]) {
    data.players[slackId].buyIns += buyInDiff;
    data.players[slackId].lastUpdated = new Date().toISOString();
  }

  await writeData(data);
}
