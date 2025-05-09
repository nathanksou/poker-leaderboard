import React, { FC, useState, useEffect } from "react";
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
import { PlayerManagement } from "../player/PlayerManagement";
import { validateGame } from "@/utils/validation";
import { ValidationError, GameFormData } from "@/types";

type EditGameDialogProps = {
  open: boolean;
  onClose: () => void;
  gameId: string;
  initialData: GameFormData;
};

export const EditGameDialog: FC<EditGameDialogProps> = ({
  open,
  onClose,
  gameId,
  initialData,
}) => {
  const { players, editGame, isLoading, error: apiError } = useGameData();
  const [formData, setFormData] = useState<GameFormData>(initialData);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleSubmit = async () => {
    const errors = validateGame(formData);
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await editGame({ gameId, formData });
      onClose();
      setValidationErrors([]);
    } catch (err) {
      console.error("Error editing game:", err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit Game</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
          {(apiError || validationErrors.length > 0) && (
            <Alert severity="error">
              {apiError?.message || "Please fix the validation errors below"}
            </Alert>
          )}

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
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
