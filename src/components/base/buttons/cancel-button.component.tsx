import { Button, ButtonProps } from "@mui/material";
import React from "react";

export const CancelButton = (props: ButtonProps) => (
  <Button variant="outlined" {...props}>
    Cancel
  </Button>
);
