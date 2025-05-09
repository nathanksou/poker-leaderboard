"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import { Leaderboard } from "@/components/leaderboard";
import { GameHistory } from "@/components/gamehistory";
import { TabButtons, TABS, Tab } from "@/components/tabs/TabButtons";
import {
  pageContainerStyles,
  contentContainerStyles,
  actionBarStyles,
} from "@/styles/page";

export default function Home() {
  const [selectedTab, setSelectedTab] = useState<Tab>(TABS.LEADERBOARD);

  return (
    <Box sx={pageContainerStyles}>
      <Box sx={contentContainerStyles}>
        <Box sx={actionBarStyles}>
          <TabButtons selectedTab={selectedTab} onTabChange={setSelectedTab} />
        </Box>

        {selectedTab === TABS.LEADERBOARD ? <Leaderboard /> : <GameHistory />}
      </Box>
    </Box>
  );
}
