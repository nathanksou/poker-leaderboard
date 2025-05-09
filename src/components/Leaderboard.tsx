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
  TableSortLabel,
} from "@mui/material";
import { PlayerStats } from "@/types";
import CasinoIcon from "@mui/icons-material/Casino";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import StarIcon from "@mui/icons-material/Star";

type LeaderboardProps = {
  players: PlayerStats[];
};

type SortField = keyof PlayerStats | "performance";
type SortOrder = "asc" | "desc";

const GOLD_COLOR = "#FFDD00";
const SILVER_COLOR = "#C0C0C0";
const BRONZE_COLOR = "#CD7F32";

const calculateScore = (p: PlayerStats) => {
  // Calculate total points from wins
  const winPoints = p.firstPlace * 5 + p.secondPlace * 2;

  // Subtract buy-in penalty
  const totalPoints = winPoints - p.buyIns * 0.5;

  // Normalize by games played
  return totalPoints / p.gamesPlayed;
};

export const Leaderboard: FC<LeaderboardProps> = ({ players }) => {
  const [orderBy, setOrderBy] = React.useState<SortField>("performance");
  const [order, setOrder] = React.useState<SortOrder>("desc");

  const handleSort = (property: SortField) => {
    const isDesc = orderBy === property && order === "desc";
    setOrder(isDesc ? "asc" : "desc");
    setOrderBy(property);
  };

  const sortedPlayers = React.useMemo(() => {
    return [...players].sort((a, b) => {
      if (orderBy === "performance") {
        const scoreA = calculateScore(a);
        const scoreB = calculateScore(b);
        return order === "asc" ? scoreA - scoreB : scoreB - scoreA;
      }
      const aValue = a[orderBy as keyof PlayerStats];
      const bValue = b[orderBy as keyof PlayerStats];
      return order === "asc"
        ? aValue > bValue
          ? 1
          : -1
        : bValue > aValue
        ? 1
        : -1;
    });
  }, [players, orderBy, order]);

  const getPlayerRank = (player: PlayerStats) => {
    const sortedByScore = [...players].sort((a, b) => {
      const scoreA = calculateScore(a);
      const scoreB = calculateScore(b);
      return scoreB - scoreA;
    });

    return sortedByScore.findIndex((p) => p.name === player.name);
  };

  const formatScore = (score: number) => {
    return `${(score * 100).toFixed(1)}%`;
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
          Poker Leaderboard
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
              <TableCell sx={{ fontWeight: "bold", color: "white" }}>
                Player
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                <TableSortLabel
                  active={orderBy === "gamesPlayed"}
                  direction={orderBy === "gamesPlayed" ? order : "desc"}
                  onClick={() => handleSort("gamesPlayed")}
                  sx={{
                    color: "white",
                    "&:hover": { color: GOLD_COLOR },
                    "&.Mui-active": { color: GOLD_COLOR },
                    "& .MuiTableSortLabel-icon": { color: "white !important" },
                  }}
                >
                  Games Played
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                <TableSortLabel
                  active={orderBy === "firstPlace"}
                  direction={orderBy === "firstPlace" ? order : "desc"}
                  onClick={() => handleSort("firstPlace")}
                  sx={{
                    color: "white",
                    "&:hover": { color: GOLD_COLOR },
                    "&.Mui-active": { color: GOLD_COLOR },
                    "& .MuiTableSortLabel-icon": { color: "white !important" },
                  }}
                >
                  1st Place
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                <TableSortLabel
                  active={orderBy === "secondPlace"}
                  direction={orderBy === "secondPlace" ? order : "desc"}
                  onClick={() => handleSort("secondPlace")}
                  sx={{
                    color: "white",
                    "&:hover": { color: GOLD_COLOR },
                    "&.Mui-active": { color: GOLD_COLOR },
                    "& .MuiTableSortLabel-icon": { color: "white !important" },
                  }}
                >
                  2nd Place
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                <TableSortLabel
                  active={orderBy === "buyIns"}
                  direction={orderBy === "buyIns" ? order : "desc"}
                  onClick={() => handleSort("buyIns")}
                  sx={{
                    color: "white",
                    "&:hover": { color: GOLD_COLOR },
                    "&.Mui-active": { color: GOLD_COLOR },
                    "& .MuiTableSortLabel-icon": { color: "white !important" },
                  }}
                >
                  Buy-ins
                </TableSortLabel>
              </TableCell>
              <TableCell
                align="right"
                sx={{ fontWeight: "bold", color: "white" }}
              >
                <TableSortLabel
                  active={orderBy === "performance"}
                  direction={orderBy === "performance" ? order : "desc"}
                  onClick={() => handleSort("performance")}
                  sx={{
                    color: "white",
                    "&:hover": { color: GOLD_COLOR },
                    "&.Mui-active": { color: GOLD_COLOR },
                    "& .MuiTableSortLabel-icon": { color: "white !important" },
                  }}
                >
                  Performance
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedPlayers.map((player) => {
              const rank = getPlayerRank(player);
              const score = calculateScore(player);
              return (
                <TableRow
                  key={player.name}
                  sx={{
                    "&:nth-of-type(odd)": {
                      background: "rgba(255,255,255,0.8)",
                    },
                    "&:nth-of-type(even)": {
                      background: "rgba(255,255,255,0.9)",
                    },
                    "&:hover": { background: "#f0f0f0" },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      fontWeight: "bold",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {rank === 0 && (
                      <EmojiEventsIcon sx={{ color: GOLD_COLOR }} />
                    )}
                    {rank === 1 && <StarIcon sx={{ color: "silver" }} />}
                    {rank === 2 && <StarIcon sx={{ color: "#CD7F32" }} />}
                    {player.name}
                  </TableCell>
                  <TableCell align="right">{player.gamesPlayed}</TableCell>
                  <TableCell align="right">{player.firstPlace}</TableCell>
                  <TableCell align="right">{player.secondPlace}</TableCell>
                  <TableCell align="right">{player.buyIns}</TableCell>
                  <TableCell
                    align="right"
                    sx={{
                      fontWeight: "bold",
                      color:
                        rank === 0
                          ? GOLD_COLOR
                          : rank === 1
                          ? SILVER_COLOR
                          : rank === 2
                          ? BRONZE_COLOR
                          : "inherit",
                    }}
                  >
                    {formatScore(score)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
