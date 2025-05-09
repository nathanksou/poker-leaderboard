import { SxProps, Theme } from "@mui/material";
import { TABLE_COLORS } from "./table";

export const tabButtonStyles: SxProps<Theme> = {
  color: (theme) => theme.palette.text.primary,
  bgcolor: TABLE_COLORS.BACKGROUND.HEADER,
  borderRadius: 2,
  "&:hover": {
    bgcolor: TABLE_COLORS.BACKGROUND.HEADER,
  },
};

export const actionButtonStyles: SxProps<Theme> = {
  bgcolor: TABLE_COLORS.BACKGROUND.HEADER,
  color: "white",
  "&:hover": {
    bgcolor: TABLE_COLORS.BACKGROUND.HEADER,
  },
};
