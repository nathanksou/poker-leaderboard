import { SxProps, Theme } from "@mui/material";

export const tableContainerStyles: SxProps<Theme> = {
  borderRadius: 2,
  boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
  background: "rgba(255,255,255,0.95)",
  flex: 1,
  overflow: "auto",
};

export const tableRowStyles: SxProps<Theme> = {
  "&:nth-of-type(odd)": { background: "rgba(255,255,255,0.8)" },
  "&:nth-of-type(even)": { background: "rgba(255,255,255,0.9)" },
  "&:hover": { background: "#f0f0f0" },
};

export const headerCellStyles: SxProps<Theme> = {
  fontWeight: "bold",
  color: "white",
  "&:hover": { color: "#FFDD00" },
};

export const headerRowStyles: SxProps<Theme> = {
  background: "#2d2d2d",
};
