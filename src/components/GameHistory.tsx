import React, { FC } from "react";
import { Table, TableBody, TableContainer, Paper } from "@mui/material";
import { GameHistoryProps } from "@/types";
import { GameHistoryTableHeader } from "./GameHistoryTableHeader";
import { GameHistoryRow } from "./GameHistoryRow";
import { PageLayout } from "./PageLayout";
import { tableContainerStyles } from "@/styles/table";
import { compareDates } from "@/utils/sorting";

export const GameHistory: FC<GameHistoryProps> = ({ games, players }) => {
  const sortedGames = React.useMemo(
    () => [...games].sort((a, b) => compareDates(a.date, b.date)),
    [games]
  );

  return (
    <PageLayout title="Game History">
      <TableContainer component={Paper} sx={tableContainerStyles}>
        <Table>
          <GameHistoryTableHeader />
          <TableBody>
            {sortedGames.map((game) => (
              <GameHistoryRow key={game.date} game={game} players={players} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </PageLayout>
  );
};
