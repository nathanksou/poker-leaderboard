import { Player } from "@/types";
import { COLORS } from "@/styles/colors";
import { calculateScore } from "./scores";

/**
 * Gets the color for a player's score based on their rank
 */
export const getScoreColor = (rank: number): string => {
  switch (rank) {
    case 0:
      return COLORS.GOLD;
    case 1:
      return COLORS.SILVER;
    case 2:
      return COLORS.BRONZE;
    default:
      return COLORS.DEFAULT;
  }
};

/**
 * Gets a player's rank in the leaderboard
 */
export const getPlayerRank = (player: Player, allPlayers: Player[]): number => {
  return allPlayers
    .map((p) => calculateScore(p))
    .sort((a, b) => b - a)
    .indexOf(calculateScore(player));
};
