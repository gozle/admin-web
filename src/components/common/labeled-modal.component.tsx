import { Box, Modal, Typography } from "@mui/material";
import React from "react";

const modalBoxStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface P {
  children: React.ReactNode;
  label: string;
  open: boolean;
  width?: number;
  onClose: () => void;
}

export const LabeledModal = ({ children, label, open, width, onClose }: P) => (
  <Modal open={open} onClose={onClose} aria-labelledby="modal-title">
    <Box sx={modalBoxStyle} width={width || 400}>
      <Typography id="modal-title" variant="h6" component="h2">
        {label}
      </Typography>
      {children}
    </Box>
  </Modal>
);
