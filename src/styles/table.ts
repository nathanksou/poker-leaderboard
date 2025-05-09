import { SxProps, Theme } from "@mui/material";
import { COLORS } from "@/styles/colors";

export const TABLE_COLORS = {
  BACKGROUND: {
    ODD: "rgba(255,255,255,0.8)",
    EVEN: "rgba(255,255,255,0.9)",
    HOVER: "#f0f0f0",
    HEADER: "#2d2d2d",
    CONTAINER: "rgba(255,255,255,0.95)",
  },
  TEXT: {
    HEADER: "white",
    HEADER_HOVER: COLORS.GOLD,
  },
} as const;

const SHADOWS = {
  TABLE: "0 4px 20px rgba(0,0,0,0.15)",
} as const;

const SPACING = {
  BORDER_RADIUS: 2,
  PADDING: 2,
} as const;

export const tableContainerStyles: SxProps<Theme> = {
  maxHeight: 600,
  borderRadius: SPACING.BORDER_RADIUS,
  boxShadow: SHADOWS.TABLE,
  background: TABLE_COLORS.BACKGROUND.CONTAINER,
  flex: 1,
  overflow: "auto",
  "& .MuiTable-root": {
    minWidth: 650,
    "@media (max-width: 600px)": {
      minWidth: "100%",
      maxHeight: "none",
    },
  },
};

export const tableRowStyles: SxProps<Theme> = {
  "&:nth-of-type(odd)": { background: TABLE_COLORS.BACKGROUND.ODD },
  "&:nth-of-type(even)": { background: TABLE_COLORS.BACKGROUND.EVEN },
  "&:hover": { background: TABLE_COLORS.BACKGROUND.HOVER },
  "@media (max-width: 600px)": {
    "& .MuiTableCell-root": {
      padding: 1,
    },
  },
};

export const headerCellStyles: SxProps<Theme> = {
  fontWeight: "bold",
  color: TABLE_COLORS.TEXT.HEADER,
  whiteSpace: "nowrap",
  "&:hover": { color: TABLE_COLORS.TEXT.HEADER_HOVER },
  "@media (max-width: 600px)": {
    fontSize: "0.875rem",
  },
};

export const headerRowStyles: SxProps<Theme> = {
  background: TABLE_COLORS.BACKGROUND.HEADER,
  "& th": {
    color: TABLE_COLORS.TEXT.HEADER,
    fontWeight: "bold",
  },
  "@media (max-width: 600px)": {
    "& .MuiTableCell-root": {
      padding: 1,
    },
  },
};

export const sortLabelStyle: SxProps<Theme> = {
  color: TABLE_COLORS.TEXT.HEADER,
  "&:hover": { color: TABLE_COLORS.TEXT.HEADER_HOVER },
  "&.Mui-active": { color: TABLE_COLORS.TEXT.HEADER_HOVER },
  "& .MuiTableSortLabel-icon": {
    color: `${TABLE_COLORS.TEXT.HEADER} !important`,
  },
};
