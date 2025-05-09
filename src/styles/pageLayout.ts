export const containerStyles = {
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
  "@media (max-width: 600px)": {
    height: "auto",
    minHeight: 800,
    p: 2,
  },
};

export const headerStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  mb: 4,
  gap: 2,
  flexShrink: 0,
  "@media (max-width: 600px)": {
    mb: 2,
    gap: 1,
  },
};

export const titleStyles = {
  fontWeight: "bold",
  color: "black",
  textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
  "@media (max-width: 600px)": {
    fontSize: "1.5rem",
  },
};

export const iconStyles = {
  fontSize: 40,
  color: "black",
  "@media (max-width: 600px)": {
    fontSize: 32,
  },
};
