import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { LeaderboardPlayerRowProps } from "@/types";
import {
  calculateScore,
  formatScore,
  getScoreColor,
  GOLD_COLOR,
  SILVER_COLOR,
  BRONZE_COLOR,
} from "@/utils/leaderboard";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import { tableRowStyles } from "@/utils/table";

const playerCellStyles = {
  fontWeight: "bold",
  display: "flex",
  alignItems: "center",
  gap: 1,
};

const getRankIcon = (rank: number) => {
  switch (rank) {
    case 0:
      return <EmojiEventsIcon sx={{ color: GOLD_COLOR }} />;
    case 1:
      return <StarIcon sx={{ color: SILVER_COLOR }} />;
    case 2:
      return <StarIcon sx={{ color: BRONZE_COLOR }} />;
    default:
      return null;
  }
};

export const LeaderboardPlayerRow: React.FC<LeaderboardPlayerRowProps> = ({
  player,
  rank,
}) => {
  const score = calculateScore(player);

  return (
    <TableRow sx={tableRowStyles}>
      <TableCell component="th" scope="row" sx={playerCellStyles}>
        {getRankIcon(rank)}
        {player.name}
      </TableCell>
      <TableCell align="right">{player.gamesPlayed}</TableCell>
      <TableCell align="right">{player.firstPlace}</TableCell>
      <TableCell align="right">{player.secondPlace}</TableCell>
      <TableCell align="right">{player.buyIns}</TableCell>
      <TableCell
        align="right"
        sx={{ fontWeight: "bold", color: getScoreColor(rank) }}
      >
        {formatScore(score)}
      </TableCell>
    </TableRow>
  );
};
