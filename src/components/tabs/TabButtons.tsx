import React from "react";
import { Box, Tab } from "@mui/material";
import { tabButtonStyles } from "@/styles/tabs";

export const TABS = {
  LEADERBOARD: "leaderboard",
  HISTORY: "history",
} as const;

export type Tab = (typeof TABS)[keyof typeof TABS];

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

type TabButtonsProps = {
  selectedTab: Tab;
  onTabChange: (tab: Tab) => void;
};

export const TabButtons: React.FC<TabButtonsProps> = ({
  selectedTab,
  onTabChange,
}) => (
  <Box sx={{ display: "flex", gap: 1 }}>
    <TabButton
      label="Leaderboard"
      icon="🏆"
      isSelected={selectedTab === TABS.LEADERBOARD}
      onClick={() => onTabChange(TABS.LEADERBOARD)}
    />
    <TabButton
      label="History"
      icon="📜"
      isSelected={selectedTab === TABS.HISTORY}
      onClick={() => onTabChange(TABS.HISTORY)}
    />
  </Box>
);
