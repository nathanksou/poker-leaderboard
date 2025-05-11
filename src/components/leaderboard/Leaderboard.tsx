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
import { getPlayerRank } from "@/utils/ranking";

export const Leaderboard: FC = () => {
  const { players, isLoading, error } = useGameData();

  const playersArray = useMemo(() => {
    return Object.entries(players as Record<string, Player>).map(
      ([slackId, player]) => ({
        slackId,
        name: player.name,
        gamesPlayed: player.gamesPlayed,
        firstPlace: player.firstPlace,
        secondPlace: player.secondPlace,
        buyIns: player.buyIns,
        lastUpdated: player.lastUpdated,
      })
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

  if (error) {
    return (
      <PageHeader title="Poker Leaderboard">
        <Alert severity="error">
          {error.message || "An error occurred while loading the leaderboard"}
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
            {sortedItems.map((player) => (
              <LeaderboardPlayerRow
                key={player.slackId}
                player={player}
                rank={getPlayerRank(player, playersArray)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageHeader>
  );
};
