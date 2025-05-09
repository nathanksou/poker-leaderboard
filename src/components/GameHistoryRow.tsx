import React from "react";
import { TableCell, TableRow, Box } from "@mui/material";
import { Game, Player, PlayerNameProps, PlayerListProps } from "@/types";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";
import { formatGameDate } from "@/utils/date";
import { COLORS } from "@/utils/leaderboard";
import { tableRowStyles } from "@/styles/table";

const PlayerName: React.FC<PlayerNameProps> = ({ slackId, players, icon }) => {
  const player = players[slackId];
  const name = player?.name || slackId;

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      {icon}
      {name}
    </Box>
  );
};

const PlayerList: React.FC<PlayerListProps> = ({ players, playerMap }) => (
  <>
    {players.map((player) => (
      <Box
        key={player.slackId}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          mb: 0.5,
        }}
      >
        <PlayerName slackId={player.slackId} players={playerMap} />(
        {player.buyIns} buy-in{player.buyIns > 1 ? "s" : ""})
      </Box>
    ))}
  </>
);

type GameHistoryRowProps = {
  game: Game;
  players?: Record<string, Player>;
};

export const GameHistoryRow: React.FC<GameHistoryRowProps> = ({
  game,
  players = {},
}) => {
  return (
    <TableRow sx={tableRowStyles}>
      <TableCell>{formatGameDate(game.date)}</TableCell>
      <TableCell>
        <PlayerName
          slackId={game.firstPlace}
          players={players}
          icon={<EmojiEventsIcon sx={{ color: COLORS.GOLD }} />}
        />
      </TableCell>
      <TableCell>
        <PlayerName
          slackId={game.secondPlace}
          players={players}
          icon={<StarIcon sx={{ color: COLORS.SILVER }} />}
        />
      </TableCell>
      <TableCell>
        <PlayerList players={game.players} playerMap={players} />
      </TableCell>
    </TableRow>
  );
};
