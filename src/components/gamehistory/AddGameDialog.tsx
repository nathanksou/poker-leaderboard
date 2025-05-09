import React, { FC, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Alert,
} from "@mui/material";
import { useGameData } from "@/hooks/useGameData";
import { PlayerManagement } from "./PlayerManagement";
import { validateGame } from "@/utils/validation";
import { ValidationError, GameFormData } from "@/types";

type AddGameDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const AddGameDialog: FC<AddGameDialogProps> = ({ open, onClose }) => {
  const { players, addGame, isLoading, error } = useGameData();
  const [formData, setFormData] = useState<GameFormData>({
    firstPlace: "",
    secondPlace: "",
    players: [{ slackId: "", buyIns: 1 }],
  });
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );

  const handleSubmit = async () => {
    const errors = validateGame(formData);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await addGame(formData);
      onClose();
      setFormData({
        firstPlace: "",
        secondPlace: "",
        players: [{ slackId: "", buyIns: 1 }],
      });
      setValidationErrors([]);
    } catch (err) {
      console.error("Error adding game:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add New Game</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          {error && <Alert severity="error">{error.message}</Alert>}

          <PlayerManagement
            players={players}
            gamePlayers={formData.players}
            onPlayersChange={(players) =>
              setFormData((prev) => ({ ...prev, players }))
            }
            validationErrors={validationErrors}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained" disabled={isLoading}>
          {isLoading ? "Adding..." : "Add Game"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
