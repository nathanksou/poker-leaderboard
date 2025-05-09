import React from "react";
import { TableCell, TableRow, Box } from "@mui/material";
import { LeaderboardPlayerRowProps } from "@/types";
import { calculateScore, formatScore } from "@/utils/scores";
import { getScoreColor } from "@/utils/ranking";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import { tableRowStyles } from "@/styles/table";

const scoreCellStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 1,
};

export const LeaderboardPlayerRow = ({
  player,
  rank,
}: LeaderboardPlayerRowProps) => {
  const score = calculateScore(player);
  const scoreColor = getScoreColor(rank);

  return (
    <TableRow sx={tableRowStyles}>
      <TableCell align="center">{rank + 1}</TableCell>
      <TableCell align="center">{player.name}</TableCell>
      <TableCell align="center">{player.gamesPlayed}</TableCell>
      <TableCell align="center">{player.firstPlace}</TableCell>
      <TableCell align="center">{player.secondPlace}</TableCell>
      <TableCell align="center">{player.buyIns}</TableCell>
      <TableCell align="center" sx={{ color: scoreColor }}>
        <Box sx={scoreCellStyles}>
          {rank < 3 ? <EmojiEventsIcon /> : <StarIcon />}
          {formatScore(score)}
        </Box>
      </TableCell>
    </TableRow>
  );
};
