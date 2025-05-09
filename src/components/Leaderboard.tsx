import React, { FC } from "react";
import { Table, TableBody, TableContainer, Paper } from "@mui/material";
import { Player, SortField, SortOrder, LeaderboardProps } from "@/types";
import { LeaderboardTableHeader } from "./LeaderboardTableHeader";
import { LeaderboardPlayerRow } from "./LeaderboardPlayerRow";
import { PageLayout } from "./PageLayout";
import { tableContainerStyles } from "@/utils/table";
import { calculateScore, getPlayerRank } from "@/utils/leaderboard";
import { compareValues } from "@/utils/sorting";

const sortPlayers = (
  players: Player[],
  orderBy: SortField,
  order: SortOrder
) => {
  return [...players].sort((a, b) => {
    if (orderBy === "performance") {
      return compareValues(calculateScore(a), calculateScore(b), order);
    }
    return compareValues(a[orderBy], b[orderBy], order);
  });
};

export const Leaderboard: FC<LeaderboardProps> = ({ players }) => {
  const [orderBy, setOrderBy] = React.useState<SortField>("performance");
  const [order, setOrder] = React.useState<SortOrder>("desc");

  const handleSort = (property: SortField) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const sortedPlayers = React.useMemo(
    () => sortPlayers(players, orderBy, order),
    [players, orderBy, order]
  );

  return (
    <PageLayout title="Poker Leaderboard">
      <TableContainer component={Paper} sx={tableContainerStyles}>
        <Table>
          <LeaderboardTableHeader
            orderBy={orderBy}
            order={order}
            onSort={handleSort}
          />
          <TableBody>
            {sortedPlayers.map((player) => (
              <LeaderboardPlayerRow
                key={player.slackId}
                player={player}
                rank={getPlayerRank(player, players)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageLayout>
  );
};
