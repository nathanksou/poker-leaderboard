import React, { FC, useMemo, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useGameData } from "@/hooks/useGameData";
import { GameHistoryRow } from "./GameHistoryRow";
import { GameDialog } from "./GameDialog";
import { compareDates } from "@/utils/sorting";
import { PageHeader } from "@/components";
import { Game } from "@/types";
import {
  tableContainerStyles,
  headerCellStyles,
  headerRowStyles,
} from "@/styles/table";

type GameHistoryProps = {
  isAdmin?: boolean;
};

export const GameHistory: FC<GameHistoryProps> = ({ isAdmin = false }) => {
  const { games, players, isLoading, error } = useGameData();
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);

  const sortedGames = useMemo(() => {
    return [...games].sort((a, b) => compareDates(a.date, b.date, "desc"));
  }, [games]);

  const selectedGame = useMemo(() => {
    return games.find((game: Game) => game.id === selectedGameId);
  }, [games, selectedGameId]);

  const handleCloseEdit = () => {
    setSelectedGameId(null);
  };

  if (isLoading) {
    return (
      <PageHeader title="Game History">
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      </PageHeader>
    );
  }

  if (error) {
    return (
      <PageHeader title="Game History">
        <Alert severity="error">
          {error.message || "An error occurred while loading game history"}
        </Alert>
      </PageHeader>
    );
  }

  if (!games.length) {
    return (
      <PageHeader title="Game History">
        <Typography variant="body1" sx={{ textAlign: "center", p: 4 }}>
          No games found
        </Typography>
      </PageHeader>
    );
  }

  return (
    <PageHeader title="Game History">
      <TableContainer component={Paper} sx={tableContainerStyles}>
        <Table>
          <TableHead>
            <TableRow sx={headerRowStyles}>
              <TableCell sx={headerCellStyles} align="center">
                Date
              </TableCell>
              <TableCell sx={headerCellStyles} align="center">
                Winner
              </TableCell>
              <TableCell sx={headerCellStyles} align="center">
                Runner-up
              </TableCell>
              <TableCell sx={headerCellStyles} align="center">
                Players
              </TableCell>
              {isAdmin && (
                <TableCell sx={headerCellStyles} align="center">
                  Actions
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedGames.map((game) => (
              <GameHistoryRow
                key={game.id}
                game={game}
                players={players}
                isAdmin={isAdmin}
                isSelected={game.id === selectedGameId}
                onSelect={() => setSelectedGameId(game.id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <GameDialog
        open={!!selectedGame}
        onClose={handleCloseEdit}
        game={selectedGame}
      />
    </PageHeader>
  );
};
