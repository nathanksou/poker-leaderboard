import React, { FC } from "react";
import {
  Box,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Player, ValidationError } from "@/types";
import { dialogSecondaryButtonStyles } from "@/styles/dialog";

type PlayerFormData = {
  slackId: string;
  buyIns: number;
};

type PlayerManagementProps = {
  players: Record<string, Player>;
  gamePlayers: PlayerFormData[];
  onPlayersChange: (players: PlayerFormData[]) => void;
  validationErrors: ValidationError[];
  selectedPlayers: string[];
};

export const PlayerManagement: FC<PlayerManagementProps> = ({
  players,
  gamePlayers,
  onPlayersChange,
  validationErrors,
  selectedPlayers,
}) => {
  const handleAddPlayer = () => {
    onPlayersChange([...gamePlayers, { slackId: "", buyIns: 1 }]);
  };

  const handleRemovePlayer = (index: number) => {
    onPlayersChange(gamePlayers.filter((_, i) => i !== index));
  };

  const handlePlayerChange = (
    index: number,
    field: keyof PlayerFormData,
    value: string | number
  ) => {
    const newPlayers = [...gamePlayers];
    newPlayers[index] = {
      ...newPlayers[index],
      [field]: value,
    };
    onPlayersChange(newPlayers);
  };

  const getPlayerFieldError = (index: number, field: string) => {
    const error = validationErrors.find(
      (err) => err.field === `players[${index}].${field}`
    );
    return error ? error.message : "";
  };

  const getAvailablePlayers = (currentValue: string) => {
    const selectedPlayersSet = new Set([
      ...selectedPlayers,
      ...gamePlayers.map((p) => p.slackId),
    ]);

    return Object.entries(players)
      .map(([slackId, player]) => ({
        slackId,
        name: player.name,
      }))
      .filter(
        (player) =>
          player.slackId === currentValue ||
          !selectedPlayersSet.has(player.slackId)
      );
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      {gamePlayers.map((player, index) => (
        <Box
          key={index}
          sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}
        >
          <FormControl
            fullWidth
            error={!!getPlayerFieldError(index, "slackId")}
          >
            <InputLabel>Player {index + 1}</InputLabel>
            <Select
              value={player.slackId}
              onChange={(e) =>
                handlePlayerChange(index, "slackId", e.target.value)
              }
              label={`Player ${index + 1}`}
            >
              {getAvailablePlayers(player.slackId).map(({ slackId, name }) => (
                <MenuItem key={slackId} value={slackId}>
                  {name}
                </MenuItem>
              ))}
            </Select>
            {getPlayerFieldError(index, "slackId") && (
              <FormHelperText>
                {getPlayerFieldError(index, "slackId")}
              </FormHelperText>
            )}
          </FormControl>

          <TextField
            label="Buy-ins"
            type="number"
            value={player.buyIns}
            onChange={(e) =>
              handlePlayerChange(index, "buyIns", parseInt(e.target.value, 10))
            }
            inputProps={{ min: 1 }}
            sx={{ width: 100 }}
            error={!!getPlayerFieldError(index, "buyIns")}
            helperText={getPlayerFieldError(index, "buyIns")}
          />

          {index > 0 && (
            <Button
              variant="outlined"
              onClick={() => handleRemovePlayer(index)}
              sx={{ ...dialogSecondaryButtonStyles, mt: 1 }}
            >
              Remove
            </Button>
          )}
        </Box>
      ))}

      <Button
        variant="outlined"
        onClick={handleAddPlayer}
        sx={{ ...dialogSecondaryButtonStyles, alignSelf: "flex-start" }}
      >
        Add Player
      </Button>
    </Box>
  );
};
