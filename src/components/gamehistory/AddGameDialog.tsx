import React, { FC, useState, useMemo } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
} from "@mui/material";
import { useGameData } from "@/hooks/useGameData";
import { PlayerManagement } from "../player/PlayerManagement";
import { validateGame } from "@/utils/validation";
import { ValidationError, GameFormData, Player } from "@/types";
import {
  dialogButtonStyles,
  dialogTitleStyles,
  dialogContentStyles,
} from "@/styles/dialog";

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
  const [winnerBuyIns, setWinnerBuyIns] = useState<number>(1);
  const [runnerUpBuyIns, setRunnerUpBuyIns] = useState<number>(1);

  const handleSubmit = async () => {
    // Add winner and runner-up to players list for validation
    const gamePlayers = [...formData.players];
    if (
      formData.firstPlace &&
      !gamePlayers.some((p) => p.slackId === formData.firstPlace)
    ) {
      gamePlayers.push({ slackId: formData.firstPlace, buyIns: winnerBuyIns });
    }
    if (
      formData.secondPlace &&
      !gamePlayers.some((p) => p.slackId === formData.secondPlace)
    ) {
      gamePlayers.push({
        slackId: formData.secondPlace,
        buyIns: runnerUpBuyIns,
      });
    }

    const errors = validateGame({ ...formData, players: gamePlayers });
    if (errors.length > 0) {
      setValidationErrors(errors);
      return;
    }

    try {
      await addGame({ ...formData, players: gamePlayers });
      onClose();
      setFormData({
        firstPlace: "",
        secondPlace: "",
        players: [{ slackId: "", buyIns: 1 }],
      });
      setWinnerBuyIns(1);
      setRunnerUpBuyIns(1);
      setValidationErrors([]);
    } catch (err) {
      console.error("Error adding game:", err);
    }
  };

  const getFieldError = (field: string) => {
    const error = validationErrors.find((err) => err.field === field);
    return error ? error.message : "";
  };

  const playersArray = useMemo(() => {
    return Object.entries(players as Record<string, Player>).map(
      ([slackId, player]) => ({
        slackId,
        name: player.name,
      })
    );
  }, [players]);

  const getAvailablePlayers = (currentValue: string) => {
    const selectedPlayers = new Set([
      formData.firstPlace,
      formData.secondPlace,
      ...formData.players.map((p) => p.slackId),
    ]);

    return playersArray.filter(
      (player) =>
        player.slackId === currentValue || !selectedPlayers.has(player.slackId)
    );
  };

  const handleBuyInsChange = (
    value: string,
    setter: (value: number) => void
  ) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue > 0) {
      setter(numValue);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={dialogTitleStyles}>Add New Game</DialogTitle>
      <DialogContent>
        <Box sx={dialogContentStyles}>
          {error && <Alert severity="error">{error.message}</Alert>}

          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <FormControl fullWidth error={!!getFieldError("firstPlace")}>
              <InputLabel>Winner</InputLabel>
              <Select
                value={formData.firstPlace}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    firstPlace: e.target.value,
                  }))
                }
                label="Winner"
              >
                {getAvailablePlayers(formData.firstPlace).map(
                  ({ slackId, name }) => (
                    <MenuItem key={slackId} value={slackId}>
                      {name}
                    </MenuItem>
                  )
                )}
              </Select>
              {getFieldError("firstPlace") && (
                <FormHelperText>{getFieldError("firstPlace")}</FormHelperText>
              )}
            </FormControl>

            <TextField
              label="Buy-ins"
              type="number"
              value={winnerBuyIns}
              onChange={(e) =>
                handleBuyInsChange(e.target.value, setWinnerBuyIns)
              }
              inputProps={{ min: 1 }}
              sx={{ width: 100 }}
            />
          </Box>

          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <FormControl fullWidth error={!!getFieldError("secondPlace")}>
              <InputLabel>Runner-up</InputLabel>
              <Select
                value={formData.secondPlace}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    secondPlace: e.target.value,
                  }))
                }
                label="Runner-up"
              >
                {getAvailablePlayers(formData.secondPlace).map(
                  ({ slackId, name }) => (
                    <MenuItem key={slackId} value={slackId}>
                      {name}
                    </MenuItem>
                  )
                )}
              </Select>
              {getFieldError("secondPlace") && (
                <FormHelperText>{getFieldError("secondPlace")}</FormHelperText>
              )}
            </FormControl>

            <TextField
              label="Buy-ins"
              type="number"
              value={runnerUpBuyIns}
              onChange={(e) =>
                handleBuyInsChange(e.target.value, setRunnerUpBuyIns)
              }
              inputProps={{ min: 1 }}
              sx={{ width: 100 }}
            />
          </Box>

          <PlayerManagement
            players={players}
            gamePlayers={formData.players}
            onPlayersChange={(players) =>
              setFormData((prev) => ({ ...prev, players }))
            }
            validationErrors={validationErrors}
            selectedPlayers={[formData.firstPlace, formData.secondPlace]}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} sx={dialogButtonStyles}>
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          disabled={isLoading}
          sx={dialogButtonStyles}
        >
          {isLoading ? "Adding..." : "Add Game"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
