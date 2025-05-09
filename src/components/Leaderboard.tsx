import React, { FC } from "react";
import { Table, TableBody, TableContainer, Paper } from "@mui/material";
import { LeaderboardProps } from "@/types";
import { LeaderboardTableHeader } from "./LeaderboardTableHeader";
import { LeaderboardPlayerRow } from "./LeaderboardPlayerRow";
import { PageLayout } from "./PageLayout";
import { tableContainerStyles } from "@/styles/table";
import { getPlayerRank } from "@/utils/leaderboard";
import { useSorting } from "@/hooks/useSorting";
import { ErrorBoundary } from "./ErrorBoundary";

export const Leaderboard: FC<LeaderboardProps> = ({ players }) => {
  const { orderBy, order, handleSort, sortedItems } = useSorting({
    items: players,
    defaultOrderBy: "performance",
  });

  return (
    <PageLayout title="Poker Leaderboard">
      <ErrorBoundary>
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
                  rank={getPlayerRank(player, players)}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ErrorBoundary>
    </PageLayout>
  );
};
