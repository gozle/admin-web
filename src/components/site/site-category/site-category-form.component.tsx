import React, { useEffect, useState } from "react";
import { TextField, Grid } from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import {
  CreateSiteCategoryRequest,
  SiteCategory,
} from "@/services/site/site-category.type";
import { FormContainer } from "@/components/common";

type P = {
  initialData?: SiteCategory;
  error?: FetchBaseQueryError | SerializedError;
  isLoading: boolean;
  onCancel?: () => void;
  onSubmit: (data: CreateSiteCategoryRequest) => void;
  reset: () => void;
  title: string;
};

export const SiteCategoryForm = ({
  initialData,
  error,
  isLoading,
  ...props
}: P) => {
  const [slug, setSlug] = useState<string>(initialData?.slug || "");
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleSubmit = async () => {
    if (slug) props.onSubmit({ slug });
  };

  useEffect(() => {
    setDisabled(!slug);
  }, [slug]);

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
          label="Slug"
          value={slug}
          disabled={isLoading}
          size="small"
          margin="dense"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          onChange={(event) => setSlug(event.target.value)}
          fullWidth
        />
      </Grid>
    </FormContainer>
  );
};
