import React, { FC, useMemo } from "react";
import {
  Table,
  TableBody,
  TableContainer,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import { LeaderboardTableHeader } from "./LeaderboardTableHeader";
import { LeaderboardPlayerRow } from "./LeaderboardPlayerRow";
import { PageHeader } from "@/components";
import { tableContainerStyles } from "@/styles/table";
import { useSorting } from "@/hooks/useSorting";
import { useGameData } from "@/hooks/useGameData";
import { Player } from "@/types";

export const Leaderboard: FC = () => {
  const { players, isLoading, isError, error } = useGameData();

  const playersArray = useMemo(() => {
    return Object.entries(players).map(
      ([
        slackId,
        { name, gamesPlayed, firstPlace, secondPlace, buyIns, lastUpdated },
      ]) =>
        ({
          slackId,
          name,
          gamesPlayed,
          firstPlace,
          secondPlace,
          buyIns,
          lastUpdated,
        } as Player)
    );
  }, [players]);

  const { orderBy, order, handleSort, sortedItems } = useSorting({
    items: playersArray,
    defaultOrderBy: "performance",
  });

  if (isLoading) {
    return (
      <PageHeader title="Poker Leaderboard">
        <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
          <CircularProgress />
        </Box>
      </PageHeader>
    );
  }

  if (isError) {
    return (
      <PageHeader title="Poker Leaderboard">
        <Alert severity="error">
          {error?.message || "An error occurred while loading the leaderboard"}
        </Alert>
      </PageHeader>
    );
  }

  return (
    <PageHeader title="Poker Leaderboard">
      <TableContainer component={Paper} sx={tableContainerStyles}>
        <Table>
          <LeaderboardTableHeader
            orderBy={orderBy}
            order={order}
            onSort={handleSort}
          />
          <TableBody>
            {sortedItems.map((player, index) => (
              <LeaderboardPlayerRow
                key={player.slackId}
                player={player}
                rank={index}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageHeader>
  );
};
