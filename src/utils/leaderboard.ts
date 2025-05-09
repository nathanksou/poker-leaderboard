import { Player } from "@/types";

export const GOLD_COLOR = "#FFDD00";
export const SILVER_COLOR = "#C0C0C0";
export const BRONZE_COLOR = "#CD7F32";

export const calculateScore = (player: Player) => {
  const winPoints = player.firstPlace * 5 + player.secondPlace * 2;
  const totalPoints = winPoints - player.buyIns * 0.5;
  return totalPoints / player.gamesPlayed;
};

export const getPlayerRank = (player: Player, allPlayers: Player[]) => {
  const sortedByScore = [...allPlayers].sort(
    (a, b) => calculateScore(b) - calculateScore(a)
  );
  return sortedByScore.findIndex((p) => p.slackId === player.slackId);
};

export const formatScore = (score: number) => `${(score * 100).toFixed(1)}%`;

export const getScoreColor = (rank: number) => {
  switch (rank) {
    case 0:
      return GOLD_COLOR;
    case 1:
      return SILVER_COLOR;
    case 2:
      return BRONZE_COLOR;
    default:
      return "inherit";
  }
};
