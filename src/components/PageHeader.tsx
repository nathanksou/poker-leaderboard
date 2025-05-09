import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import { PageHeaderProps } from "@/types";
import {
  containerStyles,
  headerStyles,
  titleStyles,
  iconStyles,
} from "@/styles/pageHeader";

export const PageHeader: FC<PageHeaderProps> = ({ title, children }) => {
  return (
    <Box sx={containerStyles}>
      <Box sx={headerStyles}>
        <CasinoIcon sx={iconStyles} />
        <Typography variant="h3" component="h1" sx={titleStyles}>
          {title}
        </Typography>
        <CasinoIcon sx={iconStyles} />
      </Box>
      {children}
    </Box>
  );
};
