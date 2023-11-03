import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";

interface P {
  open: boolean;
  title: string;
  description: string;
  onAgree: () => void;
  onClose: () => void;
  onDisagree: () => void;
}

export const ConfirmDialog = ({
  open,
  title,
  description,
  onAgree,
  onClose,
  onDisagree,
}: P) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="confirm-dialog-title"
    aria-describedby="confirm-dialog-description"
  >
    <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="confirm-dialog-description">
        {description}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onDisagree}>Disagree</Button>
      <Button onClick={onAgree} autoFocus>
        Agree
      </Button>
    </DialogActions>
  </Dialog>
);
