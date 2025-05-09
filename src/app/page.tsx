"use client";

import React from "react";
import { Leaderboard } from "@/components/Leaderboard";
import { GameHistory } from "@/components/GameHistory";
import { PlayerStats, Game, Player } from "@/types";
import { Box } from "@mui/material";
import { useQuery } from "@tanstack/react-query";

const GOLD_COLOR = "#FFDD00";

async function getPlayers(): Promise<Player[]> {
  const response = await fetch("/api/players");
  if (!response.ok) {
    throw new Error("Failed to fetch players");
  }
  const players = await response.json();
  return players.map((player: PlayerStats & { slackId: string }) => ({
    ...player,
    lastUpdated: new Date().toISOString(),
  }));
}

async function getGames(): Promise<Game[]> {
  const response = await fetch("/api/games");
  if (!response.ok) {
    throw new Error("Failed to fetch games");
  }
  return response.json();
}

export default function Home() {
  const [selectedTab, setSelectedTab] = React.useState("leaderboard");

  const { data: players, error: playersError } = useQuery({
    queryKey: ["players"],
    queryFn: getPlayers,
  });

  const { data: games, error: gamesError } = useQuery({
    queryKey: ["games"],
    queryFn: getGames,
  });

  // Transform players array into a record object
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
    return null; // This will show the loading.tsx component
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: GOLD_COLOR,
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
          <Box
            onClick={() => setSelectedTab("leaderboard")}
            sx={{
              cursor: "pointer",
              p: 1,
              borderRadius: 1,
              background: selectedTab === "leaderboard" ? "white" : "#3d3d3d",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                background: selectedTab === "leaderboard" ? "white" : "#4d4d4d",
              },
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: selectedTab === "leaderboard" ? "black" : "white",
              fontWeight: selectedTab === "leaderboard" ? "bold" : "normal",
            }}
          >
            🏆 Leaderboard
          </Box>
          <Box
            onClick={() => setSelectedTab("history")}
            sx={{
              cursor: "pointer",
              p: 1,
              borderRadius: 1,
              background: selectedTab === "history" ? "white" : "#3d3d3d",
              transition: "all 0.2s ease-in-out",
              "&:hover": {
                background: selectedTab === "history" ? "white" : "#4d4d4d",
              },
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: selectedTab === "history" ? "black" : "white",
              fontWeight: selectedTab === "history" ? "bold" : "normal",
            }}
          >
            📜 History
          </Box>
        </Box>

        {selectedTab === "leaderboard" ? (
          <Leaderboard players={players || []} />
        ) : (
          <GameHistory games={games || []} players={playersRecord} />
        )}
      </Box>
    </Box>
  );
}
