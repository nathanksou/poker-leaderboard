import React, { FC, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Backdrop,
} from "@mui/material";
import { dialogButtonStyles, dialogTitleStyles } from "@/styles/dialog";

type PasswordPromptProps = {
  open: boolean;
  onAuthenticated: () => void;
};

export const PasswordPrompt: FC<PasswordPromptProps> = ({
  open,
  onAuthenticated,
}) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = () => {
    if (password === process.env.NEXT_PUBLIC_ADMIN_PASSWORD) {
      onAuthenticated();
      setPassword("");
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <>
      <Backdrop
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backdropFilter: "blur(8px)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
        open={open}
      />
      <Dialog
        open={open}
        maxWidth="xs"
        fullWidth
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "background.paper",
            boxShadow: 24,
          },
        }}
      >
        <DialogTitle sx={dialogTitleStyles}>Admin Access</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleKeyPress}
            error={error}
            helperText={error ? "Incorrect password" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={dialogButtonStyles}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
