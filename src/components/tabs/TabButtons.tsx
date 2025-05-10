import React from "react";
import { Box, Button } from "@mui/material";
import { tabButtonStyles } from "@/styles/tabs";

export const TABS = {
  LEADERBOARD: "leaderboard",
  HISTORY: "history",
} as const;

export type Tab = (typeof TABS)[keyof typeof TABS];

type TabButtonProps = {
  label: string;
  icon: string;
  onClick: () => void;
};

const TabButton: React.FC<TabButtonProps> = ({ label, icon, onClick }) => (
  <Button
    variant="contained"
    onClick={onClick}
    sx={{
      ...tabButtonStyles,
      color: "white",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <span>{icon}</span>
      <span>{label}</span>
    </Box>
  </Button>
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
      onClick={() => onTabChange(TABS.LEADERBOARD)}
    />
    <TabButton
      label="History"
      icon="📜"
      onClick={() => onTabChange(TABS.HISTORY)}
    />
  </Box>
);
