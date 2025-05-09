import React, { FC } from "react";
import { Box, Chip, Tooltip } from "@mui/material";
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
          <Tooltip
            key={player.slackId}
            title={`Buy-ins: ${player.buyIns}`}
            arrow
          >
            <Chip
              label={playerInfo?.name || "Unknown Player"}
              size="small"
              variant="outlined"
            />
          </Tooltip>
        );
      })}
    </Box>
  );
};
