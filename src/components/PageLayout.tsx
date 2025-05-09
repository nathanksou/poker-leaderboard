import React, { FC } from "react";
import { Box, Typography } from "@mui/material";
import CasinoIcon from "@mui/icons-material/Casino";
import { PageLayoutProps } from "@/types";

const containerStyles = {
  width: "100%",
  maxWidth: 1000,
  height: 800,
  mx: "auto",
  p: 3,
  background: "white",
  borderRadius: 4,
  boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
  display: "flex",
  flexDirection: "column",
};

const headerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mb: 4,
  gap: 2,
  flexShrink: 0,
};

const titleStyles = {
  fontWeight: "bold",
  color: "black",
  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
};

const iconStyles = {
  fontSize: 40,
  color: "black",
};

export const PageLayout: FC<PageLayoutProps> = ({ title, children }) => {
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
