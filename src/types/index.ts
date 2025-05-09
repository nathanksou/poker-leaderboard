export type Player = {
  slackId: string;
  name: string;
  gamesPlayed: number;
  firstPlace: number;
  secondPlace: number;
  buyIns: number;
  lastUpdated: string;
};

export type GamePlayer = {
  slackId: string;
  buyIns: number;
  placement: "first" | "second" | "other";
};

export type Game = {
  date: string;
  players: GamePlayer[];
  firstPlace: string;
  secondPlace: string;
};

export type LeaderboardData = {
  players: Record<string, Player>;
  games: Game[];
};

export type PlayerStats = Pick<
  Player,
  "name" | "gamesPlayed" | "firstPlace" | "secondPlace" | "buyIns"
>;
