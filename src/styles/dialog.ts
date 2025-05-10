import { SxProps, Theme } from "@mui/material";
import { actionButtonStyles } from "./tabs";

export const dialogButtonStyles: SxProps<Theme> = {
  ...actionButtonStyles,
  minWidth: 100,
};

export const dialogSecondaryButtonStyles: SxProps<Theme> = {
  minWidth: 100,
  borderColor: "#2d2d2d",
  color: "#2d2d2d",
  "&:hover": {
    borderColor: "#2d2d2d",
    bgcolor: "rgba(45, 45, 45, 0.04)",
  },
};

export const dialogTitleStyles: SxProps<Theme> = {
  bgcolor: "#2d2d2d",
  color: "white",
  "& .MuiDialogTitle-root": {
    color: "white",
  },
};

export const dialogContentStyles: SxProps<Theme> = {
  mt: 2,
  display: "flex",
  flexDirection: "column",
  gap: 2,
};
