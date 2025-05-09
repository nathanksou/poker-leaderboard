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
import { compareDates } from "@/utils/sorting";
import { PageLayout } from "@/components";
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

  if (isLoading) {
    return (
      <PageLayout title={isAdmin ? "Game History Admin" : "Game History"}>
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout title={isAdmin ? "Game History Admin" : "Game History"}>
        <Alert severity="error">
          {error.message || "An error occurred while loading game history"}
        </Alert>
      </PageLayout>
    );
  }

  if (!games.length) {
    return (
      <PageLayout title={isAdmin ? "Game History Admin" : "Game History"}>
        <Typography variant="body1" sx={{ textAlign: "center", p: 4 }}>
          No games found
        </Typography>
      </PageLayout>
    );
  }

  return (
    <PageLayout title={isAdmin ? "Game History Admin" : "Game History"}>
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
    </PageLayout>
  );
};
