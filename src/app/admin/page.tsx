"use client";

import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { GameHistory, AddGameDialog } from "@/components/gamehistory";
import AddIcon from "@mui/icons-material/Add";
import { actionButtonStyles } from "@/styles/tabs";
import {
  pageContainerStyles,
  contentContainerStyles,
  actionBarStyles,
} from "@/styles/page";

export default function AdminPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <Box sx={pageContainerStyles}>
      <Box sx={contentContainerStyles}>
        <Box sx={actionBarStyles}>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddDialogOpen(true)}
            sx={actionButtonStyles}
          >
            Add Game
          </Button>
        </Box>

        <GameHistory isAdmin />

        <AddGameDialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
        />
      </Box>
    </Box>
  );
}
