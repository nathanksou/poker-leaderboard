import { ReactNode } from "react";

export type Player = {
  slackId: string;
  name: string;
  gamesPlayed: number;
  firstPlace: number;
  secondPlace: number;
  buyIns: number;
  lastUpdated: string;
};

export type GamePlayer = Pick<Player, "slackId" | "buyIns">;

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

export type SortOrder = "asc" | "desc";

export type SortField =
  | "gamesPlayed"
  | "firstPlace"
  | "secondPlace"
  | "buyIns"
  | "performance";

// Component Props Types
export type PageLayoutProps = {
  title: string;
  children: ReactNode;
};

export type LeaderboardProps = {
  players: Player[];
};

export type GameHistoryProps = {
  games: Game[];
  players: Record<string, Player>;
};

export type LeaderboardTableHeaderProps = {
  orderBy: SortField;
  order: SortOrder;
  onSort: (property: SortField) => void;
};

export type LeaderboardPlayerRowProps = {
  player: Player;
  rank: number;
};

export type GameHistoryRowProps = {
  game: Game;
  players?: Record<string, Player>;
};
