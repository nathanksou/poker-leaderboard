import React, { FC, useState, useEffect, useMemo } from "react";
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
import { ValidationError, GameFormData, Game, Player } from "@/types";
import {
  dialogButtonStyles,
  dialogTitleStyles,
  dialogContentStyles,
} from "@/styles/dialog";

type GameDialogProps = {
  open: boolean;
  onClose: () => void;
  game?: Game;
};

export const GameDialog: FC<GameDialogProps> = ({ open, onClose, game }) => {
  const {
    players,
    addGame,
    editGame,
    isLoading,
    error: apiError,
  } = useGameData();
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

  useEffect(() => {
    if (game) {
      // Filter out winner and runner-up from the players list
      const otherPlayers = game.players.filter(
        (player) =>
          player.slackId !== game.firstPlace &&
          player.slackId !== game.secondPlace
      );

      setFormData({
        firstPlace: game.firstPlace,
        secondPlace: game.secondPlace,
        players: otherPlayers.map(({ slackId, buyIns }) => ({
          slackId,
          buyIns,
        })),
      });
      // Set buy-ins for winner and runner-up
      const winner = game.players.find((p) => p.slackId === game.firstPlace);
      const runnerUp = game.players.find((p) => p.slackId === game.secondPlace);
      setWinnerBuyIns(winner?.buyIns || 1);
      setRunnerUpBuyIns(runnerUp?.buyIns || 1);
    } else {
      // Reset form for new game
      setFormData({
        firstPlace: "",
        secondPlace: "",
        players: [{ slackId: "", buyIns: 1 }],
      });
      setWinnerBuyIns(1);
      setRunnerUpBuyIns(1);
    }
    setValidationErrors([]);
  }, [game]);

  const handleSubmit = async () => {
    try {
      // Start with an empty array and build the complete players list
      const gamePlayers: GameFormData["players"] = [];

      // Add winner if not already in the list
      if (formData.firstPlace) {
        gamePlayers.push({
          slackId: formData.firstPlace,
          buyIns: winnerBuyIns,
        });
      }

      // Add runner-up if not already in the list
      if (formData.secondPlace) {
        gamePlayers.push({
          slackId: formData.secondPlace,
          buyIns: runnerUpBuyIns,
        });
      }

      // Add other players from the form data
      formData.players.forEach((player) => {
        if (
          player.slackId &&
          player.slackId !== formData.firstPlace &&
          player.slackId !== formData.secondPlace
        ) {
          gamePlayers.push(player);
        }
      });

      // Validate with the complete players list
      const errors = validateGame({ ...formData, players: gamePlayers });
      if (errors.length > 0) {
        setValidationErrors(errors);
        return;
      }

      if (game) {
        console.log("Editing game:", game.id);
        console.log("Form data:", { ...formData, players: gamePlayers });
        await editGame({
          gameId: game.id,
          formData: { ...formData, players: gamePlayers },
        });
      } else {
        console.log("Adding new game");
        console.log("Form data:", { ...formData, players: gamePlayers });
        await addGame({ ...formData, players: gamePlayers });
      }
      onClose();
    } catch (err) {
      console.error("Error saving game:", err);
      setValidationErrors([
        {
          field: "submit",
          message: err instanceof Error ? err.message : "Failed to save game",
        },
      ]);
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
      <DialogTitle sx={dialogTitleStyles}>
        {game ? "Edit Game" : "Add New Game"}
      </DialogTitle>
      <DialogContent>
        <Box sx={dialogContentStyles}>
          {(apiError || validationErrors.length > 0) && (
            <Alert severity="error">
              {apiError?.message || "Please fix the validation errors below"}
            </Alert>
          )}

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
          {isLoading ? "Saving..." : game ? "Save Changes" : "Add Game"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
