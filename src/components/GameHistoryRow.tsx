import React from "react";
import { TableCell, TableRow, Box } from "@mui/material";
import { Game, Player } from "@/types";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import { formatGameDate } from "@/utils/date";
import { GOLD_COLOR } from "@/utils/leaderboard";
import { tableRowStyles } from "@/utils/table";

type GameHistoryRowProps = {
  game: Game;
  players?: Record<string, Player>;
};

export const GameHistoryRow: React.FC<GameHistoryRowProps> = ({
  game,
  players = {},
}) => {
  const getPlayerName = (slackId: string) => {
    const player = players[slackId];
    return player?.name || slackId;
  };

  return (
    <TableRow sx={tableRowStyles}>
      <TableCell>{formatGameDate(game.date)}</TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <EmojiEventsIcon sx={{ color: GOLD_COLOR }} />
          {getPlayerName(game.firstPlace)}
        </Box>
      </TableCell>
      <TableCell>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <StarIcon sx={{ color: "silver" }} />
          {getPlayerName(game.secondPlace)}
        </Box>
      </TableCell>
      <TableCell>
        {game.players.map((player) => (
          <Box
            key={player.slackId}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              mb: 0.5,
            }}
          >
            {getPlayerName(player.slackId)} ({player.buyIns} buy-in
            {player.buyIns > 1 ? "s" : ""})
          </Box>
        ))}
      </TableCell>
    </TableRow>
  );
};
