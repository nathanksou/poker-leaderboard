import React, { FC } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";
import { Game } from "@/types";
import CasinoIcon from "@mui/icons-material/Casino";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";

type GameHistoryProps = {
  games: Game[];
};

const GOLD_COLOR = "#FFDD00";

export const GameHistory: FC<GameHistoryProps> = ({ games }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1000,
        height: 800,
        mx: "auto",
        p: 3,
        background: "white",
        borderRadius: 4,
        boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mb: 4,
          gap: 2,
          flexShrink: 0,
        }}
      >
        <CasinoIcon sx={{ fontSize: 40, color: "black" }} />
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: "bold",
            color: "black",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Game History
        </Typography>
        <CasinoIcon sx={{ fontSize: 40, color: "black" }} />
      </Box>

      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 2,
          boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
          background: "rgba(255,255,255,0.95)",
          flex: 1,
          overflow: "auto",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ background: "#2d2d2d" }}>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  "&:hover": { color: GOLD_COLOR },
                }}
              >
                Date & Time
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  "&:hover": { color: GOLD_COLOR },
                }}
              >
                Winner
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  "&:hover": { color: GOLD_COLOR },
                }}
              >
                Runner-up
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: "bold",
                  color: "white",
                  "&:hover": { color: GOLD_COLOR },
                }}
              >
                Players
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {games.map((game) => (
              <TableRow
                key={game.date}
                sx={{
                  "&:nth-of-type(odd)": { background: "rgba(255,255,255,0.8)" },
                  "&:nth-of-type(even)": {
                    background: "rgba(255,255,255,0.9)",
                  },
                  "&:hover": { background: "#f0f0f0" },
                }}
              >
                <TableCell>{formatDate(game.date)}</TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <EmojiEventsIcon sx={{ color: GOLD_COLOR }} />
                    {game.firstPlace}
                  </Box>
                </TableCell>
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <StarIcon sx={{ color: "silver" }} />
                    {game.secondPlace}
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
                      {player.slackId} ({player.buyIns} buy-in
                      {player.buyIns > 1 ? "s" : ""})
                    </Box>
                  ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
