import React from "react";
import { TableCell, TableRow, TableHead } from "@mui/material";
import { headerCellStyles, headerRowStyles } from "@/styles/table";

type GameHistoryTableHeaderProps = {
  showActions?: boolean;
};

export const GameHistoryTableHeader: React.FC<GameHistoryTableHeaderProps> = ({
  showActions = false,
}) => {
  return (
    <TableHead>
      <TableRow sx={headerRowStyles}>
        <TableCell sx={headerCellStyles}>Date</TableCell>
        <TableCell sx={headerCellStyles}>Winner</TableCell>
        <TableCell sx={headerCellStyles}>Runner-up</TableCell>
        <TableCell sx={headerCellStyles}>Players</TableCell>
        {showActions && (
          <TableCell
            sx={{
              ...headerCellStyles,
              bgcolor: "#2d2d2d",
              color: "white",
            }}
            align="center"
          >
            Actions
          </TableCell>
        )}
      </TableRow>
    </TableHead>
  );
};
