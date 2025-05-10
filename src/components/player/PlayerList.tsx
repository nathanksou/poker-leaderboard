import React, { FC } from "react";
import { Box, Chip } from "@mui/material";
import { GamePlayer, Player } from "@/types";

type PlayerListProps = {
  players: GamePlayer[];
  playerMap: Record<string, Player>;
};

export const PlayerList: FC<PlayerListProps> = ({ players, playerMap }) => {
  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
      {players.map((player) => {
        const playerInfo = playerMap[player.slackId];
        return (
          <Chip
            key={player.slackId}
            label={`${playerInfo?.name || "Unknown Player"}: ${player.buyIns}`}
            size="small"
            variant="outlined"
          />
        );
      })}
    </Box>
  );
};
