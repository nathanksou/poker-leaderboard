import React, { FC } from "react";
import { TableRow, TableCell, IconButton, Box, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Game, Player } from "@/types";
import { PlayerName } from "../player/PlayerName";
import { PlayerList } from "../player/PlayerList";
import { useGameData } from "@/hooks/useGameData";
import { tableRowStyles } from "@/styles/table";

type GameHistoryRowProps = {
  game: Game;
  players: Record<string, Player>;
  isAdmin?: boolean;
  isSelected?: boolean;
  onSelect?: () => void;
};

export const GameHistoryRow: FC<GameHistoryRowProps> = ({
  game,
  players,
  isAdmin = false,
  isSelected = false,
  onSelect,
}) => {
  const { deleteGame } = useGameData();

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this game?")) {
      try {
        await deleteGame(game.id);
      } catch (err) {
        console.error("Error deleting game:", err);
      }
    }
  };

  const handleEdit = () => {
    onSelect?.();
  };

  return (
    <TableRow hover selected={isSelected} sx={tableRowStyles}>
      <TableCell align="center">
        {new Date(game.date).toLocaleDateString()}
      </TableCell>
      <TableCell align="center">
        <PlayerName slackId={game.firstPlace} players={players} />
      </TableCell>
      <TableCell align="center">
        <PlayerName slackId={game.secondPlace} players={players} />
      </TableCell>
      <TableCell align="center">
        <PlayerList players={game.players} playerMap={players} />
      </TableCell>
      {isAdmin && (
        <TableCell align="center">
          <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
            <Tooltip title="Edit game">
              <IconButton onClick={handleEdit} size="small">
                <EditIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Delete game">
              <IconButton onClick={handleDelete} size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </TableCell>
      )}
    </TableRow>
  );
};
