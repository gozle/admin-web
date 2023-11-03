import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  ClickAwayListener,
  Paper,
  Grid,
} from "@mui/material";
import { Service } from "@/services/service";
import { SketchPicker, ColorResult } from "react-color";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { DragAndDropFile, FormContainer } from "../common";

type P = {
  initialData?: Service;
  error?: FetchBaseQueryError | SerializedError;
  isLoading: boolean;
  edit: boolean;
  onCancel?: () => void;
  onSubmit: (data: FormData) => void;
  reset: () => void;
  title: string;
};

export const ServiceForm = ({ initialData, error, isLoading, ...props }: P) => {
  const [siteUrl, setSiteUrl] = useState<string>(initialData?.siteUrl || "");
  const [logo, setLogo] = useState<File | undefined>();
  const [color, setColor] = useState<string>(initialData?.color || "");
  const [colorOpen, setColorOpen] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("siteUrl", siteUrl);
    fd.append("color", color);
    if (logo) fd.append("logo", logo);
    if (props.edit || logo) props.onSubmit(fd);
  };

  useEffect(() => {
    setDisabled(!siteUrl || !color || !(props.edit || logo));
  }, [siteUrl, color, props.edit, logo]);

  return (
    <FormContainer
      hasError={disabled}
      loading={isLoading}
      error={error}
      title={props.title}
      onSubmit={handleSubmit}
      onCancel={props.onCancel}
      reset={props.reset}
    >
      <Grid item xs={12}>
        <TextField
          type="text"
          label="Site URL"
          value={siteUrl}
          disabled={isLoading}
          size="small"
          margin="dense"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          onChange={(event) => setSiteUrl(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl
          margin="dense"
          fullWidth
          variant="standard"
          disabled={isLoading}
        >
          <InputLabel id="service-form-logo" shrink={true}>
            Logo
          </InputLabel>
          <Box sx={{ mt: 2 }}>
            <DragAndDropFile
              helpText="Drop your file here or click to select"
              accept={{ "image/*": [] }}
              maxFiles={1}
              files={logo ? [logo] : []}
              disabled={isLoading}
              onDrop={(files) => {
                if (files.length) setLogo(files[0]);
              }}
            />
          </Box>
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl margin="dense" fullWidth sx={{ position: "relative" }}>
          <InputLabel variant="standard" shrink={true}>
            Color
          </InputLabel>
          <Paper
            sx={{
              height: (theme) => theme.spacing(4),
              backgroundColor: color,
              mt: (theme) => theme.spacing(2),
              cursor: "pointer",
            }}
            onClick={() => setColorOpen(true)}
          />
          {colorOpen && (
            <ClickAwayListener onClickAway={() => setColorOpen(false)}>
              <Box sx={{ position: "absolute", bottom: 0 }}>
                <SketchPicker
                  color={color}
                  onChangeComplete={(c: ColorResult) =>
                    setColor(
                      c.rgb.a
                        ? `rgba(${c.rgb.r},${c.rgb.g},${c.rgb.b},${c.rgb.a})`
                        : `rgb(${c.rgb.r},${c.rgb.g},${c.rgb.b})`
                    )
                  }
                />
              </Box>
            </ClickAwayListener>
          )}
        </FormControl>
      </Grid>
    </FormContainer>
  );
};
