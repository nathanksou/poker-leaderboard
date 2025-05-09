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

export type GamePlayer = {
  slackId: string;
  buyIns: number;
  placement: "first" | "second" | "other";
};

export type Game = {
  id: string;
  date: string;
  firstPlace: string;
  secondPlace: string;
  players: GamePlayer[];
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

export type ErrorResponse = {
  error: string;
};

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

// Component-specific types
export type PlayerNameProps = {
  slackId: string;
  players: Record<string, Player>;
  icon?: ReactNode;
};

export type PlayerListProps = {
  players: GamePlayer[];
  playerMap: Record<string, Player>;
};

export type ErrorBoundaryProps = {
  children: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
  error?: Error;
};

export type ValidationError = {
  field: string;
  message: string;
};

export type PlayerFormData = {
  slackId: string;
  buyIns: number;
};

export type GameFormData = {
  firstPlace: string;
  secondPlace: string;
  players: PlayerFormData[];
};
