import React from "react";
import { TableCell, TableRow } from "@mui/material";
import { headerCellStyles, headerRowStyles } from "@/utils/table";

export const GameHistoryTableHeader: React.FC = () => {
  return (
    <TableRow sx={headerRowStyles}>
      <TableCell sx={headerCellStyles}>Date & Time</TableCell>
      <TableCell sx={headerCellStyles}>Winner</TableCell>
      <TableCell sx={headerCellStyles}>Runner-up</TableCell>
      <TableCell sx={headerCellStyles}>Players</TableCell>
    </TableRow>
  );
};
