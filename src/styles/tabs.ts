import { SxProps, Theme } from "@mui/material";
import { TABLE_COLORS } from "./table";

export const tabButtonStyles: SxProps<Theme> = {
  color: (theme) => theme.palette.text.primary,
  bgcolor: "#2d2d2d",
  borderRadius: 2,
  "&:hover": {
    bgcolor: "#2d2d2d",
  },
};

export const actionButtonStyles: SxProps<Theme> = {
  bgcolor: TABLE_COLORS.BACKGROUND.HEADER,
  color: "white",
  "&:hover": {
    bgcolor: TABLE_COLORS.BACKGROUND.HEADER,
  },
};
