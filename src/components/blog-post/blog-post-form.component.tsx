import React, { useEffect, useState } from "react";
import { Box, FormControl, InputLabel, Grid } from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { CreateBlogPostRequest } from "@/services/blog";
import { DragAndDropFile, FormContainer } from "../common";

type P = {
  error?: FetchBaseQueryError | SerializedError;
  isLoading: boolean;
  edit: boolean;
  onCancel?: () => void;
  onSubmit: (data: CreateBlogPostRequest) => void;
  reset: () => void;
  title: string;
};

export const BlogPostForm = ({ error, isLoading, ...props }: P) => {
  const [image, setImage] = useState<File | undefined>();
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleSubmit = async () => {
    const fd = new FormData();
    if (image) fd.append("image", image);
    if (props.edit || image) props.onSubmit(fd);
  };

  useEffect(() => {
    setDisabled(!props.edit && !image);
  }, [props.edit, image]);

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
        <FormControl
          margin="dense"
          fullWidth
          variant="standard"
          disabled={isLoading}
        >
          <InputLabel shrink={true}>Image</InputLabel>
          <Box sx={{ mt: 2 }}>
            <DragAndDropFile
              helpText="Drop your file here or click to select"
              accept={{ "image/*": [] }}
              maxFiles={1}
              files={image ? [image] : []}
              disabled={isLoading}
              onDrop={(files) => {
                if (files.length) setImage(files[0]);
              }}
            />
          </Box>
        </FormControl>
      </Grid>
    </FormContainer>
  );
};
