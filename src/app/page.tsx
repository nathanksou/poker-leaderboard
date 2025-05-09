"use client";

import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { Leaderboard } from "@/components/leaderboard";
import { GameHistory } from "@/components/gamehistory";
import { COLORS } from "@/utils/leaderboard";
import { TABLE_COLORS } from "@/styles/table";

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

const TabButton: React.FC<TabButtonProps> = ({
  label,
  icon,
  isSelected,
  onClick,
}) => (
  <Tab
    label={`${icon} ${label}`}
    onClick={onClick}
    sx={{
      color: isSelected ? "white" : "rgba(255, 255, 255, 0.7)",
      bgcolor: TABLE_COLORS.BACKGROUND.HEADER,
      borderRadius: 2,
      "&:hover": {
        bgcolor: TABLE_COLORS.BACKGROUND.HEADER,
      },
    }}
  />
);

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<Tab>(TABS.LEADERBOARD);

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

        {selectedTab === TABS.LEADERBOARD ? <Leaderboard /> : <GameHistory />}
      </Box>
    </Box>
  );
}
