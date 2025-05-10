import React, { FC, ReactNode } from "react";
import { Box, Typography } from "@mui/material";

type PageHeaderProps = {
  title: string;
  children: ReactNode;
};

export const PageHeader: FC<PageHeaderProps> = ({ title, children }) => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>
        {title}
      </Typography>
      {children}
    </Box>
  );
};
