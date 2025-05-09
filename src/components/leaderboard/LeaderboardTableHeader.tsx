import React from "react";
import { TableCell, TableRow, TableSortLabel, TableHead } from "@mui/material";
import { SortField, SortOrder } from "@/types";
import {
  headerCellStyles,
  headerRowStyles,
  sortLabelStyle,
} from "@/styles/table";

type LeaderboardTableHeaderProps = {
  orderBy: SortField;
  order: SortOrder;
  onSort: (property: SortField) => void;
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
    <TableHead>
      <TableRow sx={headerRowStyles}>
        <TableCell sx={headerCellStyles} align="center">
          Rank
        </TableCell>
        <TableCell sx={headerCellStyles} align="center">
          Player
        </TableCell>
        {columns.map(({ field, label }) => (
          <TableCell key={field} align="center" sx={headerCellStyles}>
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
    </TableHead>
  );
};
