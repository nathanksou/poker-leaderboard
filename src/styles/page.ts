import { SxProps, Theme } from "@mui/material";
import { COLORS } from "@/styles/colors";

export const pageContainerStyles: SxProps<Theme> = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: COLORS.GOLD,
  py: 4,
};

export const contentContainerStyles: SxProps<Theme> = {
  width: "100%",
  maxWidth: 1000,
  px: 2,
};

export const actionBarStyles: SxProps<Theme> = {
  display: "flex",
  gap: 1,
  mb: 2,
  justifyContent: "flex-end",
};
