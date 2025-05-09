import { Player } from "@/types";

export const COLORS = {
  GOLD: "#FFDD00",
  SILVER: "#C0C0C0",
  BRONZE: "#CD7F32",
  DEFAULT: "inherit",
} as const;

const SCORE_MULTIPLIERS = {
  FIRST_PLACE: 5,
  SECOND_PLACE: 2,
  BUY_IN: 0.5,
} as const;

/**
 * Calculates a player's performance score based on their game statistics.
 * Score = (Win Points - Buy-in Points) / Games Played
 * Win Points = (First Place * 5) + (Second Place * 2)
 * Buy-in Points = Buy-ins * 0.5
 *
 * @param player - The player to calculate the score for
 * @returns The calculated performance score
 */
export const calculateScore = (player: Player): number => {
  if (player.gamesPlayed === 0) return 0;

  const winPoints =
    player.firstPlace * SCORE_MULTIPLIERS.FIRST_PLACE +
    player.secondPlace * SCORE_MULTIPLIERS.SECOND_PLACE;
  const totalPoints = winPoints - player.buyIns * SCORE_MULTIPLIERS.BUY_IN;
  return totalPoints / player.gamesPlayed;
};

/**
 * Formats a score to 2 decimal places
 */
export const formatScore = (score: number): string => {
  return score.toFixed(2);
};

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
