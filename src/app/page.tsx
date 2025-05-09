"use client";

import React, { useState } from "react";
import { Box, Tab } from "@mui/material";
import { Leaderboard } from "@/components/leaderboard";
import { GameHistory } from "@/components/gamehistory";
import { tabButtonStyles } from "@/styles/tabs";
import {
  pageContainerStyles,
  contentContainerStyles,
  actionBarStyles,
} from "@/styles/page";

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
    label={
      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <span>{icon}</span>
        <span>{label}</span>
      </Box>
    }
    onClick={onClick}
    sx={{
      ...tabButtonStyles,
      color: isSelected ? "white" : "rgba(255, 255, 255, 0.7)",
    }}
  />
);

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<Tab>(TABS.LEADERBOARD);

  return (
    <Box sx={pageContainerStyles}>
      <Box sx={contentContainerStyles}>
        <Box sx={actionBarStyles}>
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
