"use client";

import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import { GameHistory, GameDialog } from "@/components/gamehistory";
import AddIcon from "@mui/icons-material/Add";
import { actionButtonStyles } from "@/styles/tabs";
import {
  pageContainerStyles,
  contentContainerStyles,
  actionBarStyles,
} from "@/styles/page";
import { PasswordPrompt } from "@/components/admin/PasswordPrompt";

export default function AdminPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if already authenticated
  useEffect(() => {
    console.log("Checking authentication...");
    const checkAuth = async () => {
      try {
        // Clear any existing auth state
        localStorage.removeItem("adminAuth");
        setIsAuthenticated(false);
      } catch (error) {
        console.error("Error clearing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const handleAuthenticated = () => {
    console.log("Handling authentication...");
    try {
      localStorage.setItem("adminAuth", "true");
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Error setting auth:", error);
    }
  };

  if (isLoading) {
    return null;
  }

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

        <GameDialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
        />
      </Box>
      <PasswordPrompt
        open={!isAuthenticated}
        onAuthenticated={handleAuthenticated}
      />
    </Box>
  );
}
