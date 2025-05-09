"use client";

import React, { useState } from "react";
import { Box, Button } from "@mui/material";
import { GameHistory, AddGameDialog } from "@/components/gamehistory";
import { COLORS } from "@/utils/leaderboard";
import AddIcon from "@mui/icons-material/Add";

export default function AdminPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

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
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setIsAddDialogOpen(true)}
            sx={{
              bgcolor: "rgba(0, 0, 0, 0.2)",
              color: "white",
              "&:hover": {
                bgcolor: "rgba(0, 0, 0, 0.3)",
              },
            }}
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
