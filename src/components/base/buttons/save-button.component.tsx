import { Button, ButtonProps } from "@mui/material";
import React from "react";

export const SaveButton = (props: ButtonProps) => (
  <Button variant="outlined" {...props}>
    Save
  </Button>
);
