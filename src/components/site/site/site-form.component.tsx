import React, { useEffect, useState } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { Site, useGetSiteCategoryListQuery } from "@/services/site";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { DragAndDropFile, FormContainer } from "../../common";

type P = {
  initialData?: Site;
  categoryId?: number | string;
  error?: FetchBaseQueryError | SerializedError;
  isLoading: boolean;
  edit: boolean;
  onSubmit: (data: FormData) => void;
  onCancel?: () => void;
  reset: () => void;
  title: string;
};

export const SiteForm = ({ initialData, error, isLoading, ...props }: P) => {
  const [siteUrl, setSiteUrl] = useState<string>(initialData?.siteUrl || "");
  const [logo, setLogo] = useState<File | undefined>();
  const [categoryId, setCategoryId] = useState<string>(
    String(initialData?.categoryId || props.categoryId || "")
  );
  const [disabled, setDisabled] = useState<boolean>(true);

  const { data: categories } = useGetSiteCategoryListQuery(undefined, {
    skip: !!props.categoryId,
  });

  const handleSubmit = async () => {
    const fd = new FormData();
    fd.append("siteUrl", siteUrl);
    fd.append("categoryId", categoryId);
    if (logo) fd.append("logo", logo);
    if (props.edit || logo) props.onSubmit(fd);
  };

  useEffect(() => {
    setDisabled(!siteUrl || !categoryId || !(props.edit || logo));
  }, [siteUrl, categoryId, props.edit, logo]);

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
          <InputLabel id="site-form-logo" shrink={true}>
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
        {categories && (
          <FormControl fullWidth margin="dense" variant="standard">
            <InputLabel id="site-form-category">Category</InputLabel>
            <Select
              labelId="site-form-category"
              label="Category"
              value={categoryId}
              onChange={(event) => setCategoryId(event.target.value)}
            >
              {categories.data.map((c) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.slug}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Grid>
    </FormContainer>
  );
};
