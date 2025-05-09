import React from "react";
import { TableCell, TableRow, TableHead } from "@mui/material";
import { headerCellStyles, headerRowStyles } from "@/styles/table";

export const GameHistoryTableHeader: React.FC = () => {
  return (
    <TableHead>
      <TableRow sx={headerRowStyles}>
        <TableCell sx={headerCellStyles}>Date & Time</TableCell>
        <TableCell sx={headerCellStyles}>Winner</TableCell>
        <TableCell sx={headerCellStyles}>Runner-up</TableCell>
        <TableCell sx={headerCellStyles}>Players</TableCell>
      </TableRow>
    </TableHead>
  );
};
