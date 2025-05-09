import React from "react";
import { TableCell, TableRow, TableSortLabel } from "@mui/material";
import { GOLD_COLOR } from "@/utils/leaderboard";
import { headerCellStyles, headerRowStyles } from "@/utils/table";
import { SortField, SortOrder } from "@/types";

type LeaderboardTableHeaderProps = {
  orderBy: SortField;
  order: SortOrder;
  onSort: (property: SortField) => void;
};

const sortLabelStyle = {
  color: "white",
  "&:hover": { color: GOLD_COLOR },
  "&.Mui-active": { color: GOLD_COLOR },
  "& .MuiTableSortLabel-icon": { color: "white !important" },
};

const columns: Array<{ field: SortField; label: string }> = [
  { field: "gamesPlayed", label: "Games Played" },
  { field: "firstPlace", label: "1st Place" },
  { field: "secondPlace", label: "2nd Place" },
  { field: "buyIns", label: "Buy-ins" },
  { field: "performance", label: "Performance" },
];

export const LeaderboardTableHeader: React.FC<LeaderboardTableHeaderProps> = ({
  orderBy,
  order,
  onSort,
}) => {
  return (
    <TableRow sx={headerRowStyles}>
      <TableCell sx={headerCellStyles}>Player</TableCell>
      {columns.map(({ field, label }) => (
        <TableCell key={field} align="right" sx={headerCellStyles}>
          <TableSortLabel
            active={orderBy === field}
            direction={orderBy === field ? order : "desc"}
            onClick={() => onSort(field)}
            sx={sortLabelStyle}
          >
            {label}
          </TableSortLabel>
        </TableCell>
      ))}
    </TableRow>
  );
};
