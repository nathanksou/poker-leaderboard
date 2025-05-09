import React, { FC } from "react";
import { Typography } from "@mui/material";
import { Player } from "@/types";

type PlayerNameProps = {
  slackId: string;
  players: Record<string, Player>;
};

export const PlayerName: FC<PlayerNameProps> = ({ slackId, players }) => {
  const player = players[slackId];
  return (
    <Typography variant="body2" component="span">
      {player?.name || "Unknown Player"}
    </Typography>
  );
};
