import React, { FC, useState } from "react";
import {
  TableCell,
  TableRow,
  Box,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Game, Player } from "@/types";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { formatGameDate } from "@/utils/date";
import { tableRowStyles } from "@/styles/table";
import { GameDialog } from "./GameDialog";
import { PlayerName } from "../player/PlayerName";
import { PlayerList } from "../player/PlayerList";

type GameHistoryRowAdminProps = {
  game: Game;
  players: Record<string, Player>;
  onDelete: (gameId: string) => Promise<void>;
};

export const GameHistoryRowAdmin: FC<GameHistoryRowAdminProps> = ({
  game,
  players,
  onDelete,
}) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(game.id);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <TableRow sx={tableRowStyles}>
        <TableCell>{formatGameDate(game.date)}</TableCell>
        <TableCell>
          <PlayerName slackId={game.firstPlace} players={players} />
        </TableCell>
        <TableCell>
          <PlayerName slackId={game.secondPlace} players={players} />
        </TableCell>
        <TableCell>
          <PlayerList players={game.players} playerMap={players} />
        </TableCell>
        <TableCell align="center">
          <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
            <IconButton
              onClick={() => setIsEditDialogOpen(true)}
              sx={{
                color: "primary.main",
                "&:hover": {
                  color: "primary.dark",
                },
              }}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={handleDelete}
              disabled={isDeleting}
              sx={{
                color: "error.main",
                "&:hover": {
                  color: "error.dark",
                },
              }}
            >
              {isDeleting ? <CircularProgress size={24} /> : <DeleteIcon />}
            </IconButton>
          </Box>
        </TableCell>
      </TableRow>

      <GameDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        game={game}
      />
    </>
  );
};
