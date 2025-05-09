"use client";

import React from "react";
import { Leaderboard } from "@/components/Leaderboard";
import { GameHistory } from "@/components/GameHistory";
import { Game, Player } from "@/types";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { COLORS } from "@/utils/leaderboard";

const TABS = {
  LEADERBOARD: "leaderboard",
  HISTORY: "history",
} as const;

type Tab = (typeof TABS)[keyof typeof TABS];

type TabButtonProps = {
  label: string;
  icon: string;
  isSelected: boolean;
  onClick: () => void;
};

const TabButton = ({ label, icon, isSelected, onClick }: TabButtonProps) => (
  <Box
    onClick={onClick}
    sx={{
      cursor: "pointer",
      p: 1,
      borderRadius: 1,
      background: isSelected ? "white" : "#3d3d3d",
      transition: "all 0.2s ease-in-out",
      "&:hover": {
        background: isSelected ? "white" : "#4d4d4d",
      },
      display: "flex",
      alignItems: "center",
      gap: 1,
      color: isSelected ? "black" : "white",
      fontWeight: isSelected ? "bold" : "normal",
    }}
  >
    {icon} {label}
  </Box>
);

async function getPlayers(): Promise<Player[]> {
  const response = await fetch("/api/players");
  if (!response.ok) {
    throw new Error("Failed to fetch players");
  }
  return response.json();
}

async function getGames(): Promise<Game[]> {
  const response = await fetch("/api/games");
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
}

export default function Home() {
  const [selectedTab, setSelectedTab] = React.useState<Tab>(TABS.LEADERBOARD);

  const { data: players, error: playersError } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });

  const { data: games, error: gamesError } = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
  });

  const playersRecord = React.useMemo(() => {
    return (players || []).reduce<Record<string, Player>>((acc, player) => {
      acc[player.slackId] = player;
      return acc;
    }, {});
  }, [players]);

  const error = playersError || gamesError;

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          color: "error.main",
        }}
      >
        Error: {error instanceof Error ? error.message : "An error occurred"}
      </Box>
    );
  }

  if (!players || !games) {
    return null;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: COLORS.GOLD,
        py: 4,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 1000, px: 2 }}>
        <Box
          sx={{
            display: "flex",
            gap: 1,
            mb: 2,
            justifyContent: "flex-end",
          }}
        >
          <TabButton
            label="Leaderboard"
            icon="🏆"
            isSelected={selectedTab === TABS.LEADERBOARD}
            onClick={() => setSelectedTab(TABS.LEADERBOARD)}
          />
          <TabButton
            label="History"
            icon="📜"
            isSelected={selectedTab === TABS.HISTORY}
            onClick={() => setSelectedTab(TABS.HISTORY)}
          />
        </Box>

        {selectedTab === TABS.LEADERBOARD ? (
          <Leaderboard players={players} />
        ) : (
          <GameHistory games={games} players={playersRecord} />
        )}
      </Box>
    </Box>
  );
}
