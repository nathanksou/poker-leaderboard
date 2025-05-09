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
import { EditGameDialog } from "./EditGameDialog";

type AdminGameHistoryRowProps = {
  game: Game;
  players: Record<string, Player>;
  onDelete: (gameId: string) => Promise<void>;
  onEdit: (gameId: string, updatedGame: Game) => Promise<void>;
};

type PlayerNameProps = {
  slackId: string;
  players: Record<string, Player>;
  icon?: React.ReactNode;
};

const PlayerName: FC<PlayerNameProps> = ({ slackId, players, icon }) => {
  const player = players[slackId];
  const name = player?.name || slackId;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {icon}
      {name}
    </Box>
  );
};

type PlayerListProps = {
  players: Game["players"];
  playerMap: Record<string, Player>;
};

const PlayerList: FC<PlayerListProps> = ({ players, playerMap }) => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
    {players.map((player) => (
      <Box key={player.slackId} sx={{ display: "flex", gap: 1 }}>
        <PlayerName slackId={player.slackId} players={playerMap} />
        <Box sx={{ color: "text.secondary" }}>({player.buyIns} buy-ins)</Box>
      </Box>
    ))}
  </Box>
);

export const AdminGameHistoryRow: FC<AdminGameHistoryRowProps> = ({
  game,
  players,
  onDelete,
  onEdit,
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

      <EditGameDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        game={game}
        players={players}
        onEdit={onEdit}
      />
    </>
  );
};
