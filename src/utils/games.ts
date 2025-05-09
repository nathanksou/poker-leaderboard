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
