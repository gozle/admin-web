import React, { useEffect, useState } from "react";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
} from "@mui/material";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { useGetLanguageListQuery } from "@/services/language";
import {
  CreateSiteTranslationRequest,
  UpdateSiteTranslationRequest,
  SiteTranslation,
} from "@/services/site";
import { FormContainer } from "@/components/common";

type P = {
  initialData?: SiteTranslation;
  error?: FetchBaseQueryError | SerializedError;
  isLoading: boolean;
  onCancel?: () => void;
  reset: () => void;
  title: string;
} & (
  | {
      edit: false;
      siteId: number;
      onSubmit: (data: CreateSiteTranslationRequest) => void;
    }
  | {
      edit: true;
      onSubmit: (data: UpdateSiteTranslationRequest["body"]) => void;
    }
);

export const SiteTranslationForm = ({
  initialData,
  error,
  isLoading,
  ...props
}: P) => {
  const [title, setTitle] = useState<string>(initialData?.title || "");
  const [description, setDescription] = useState<string>(
    initialData?.description || ""
  );
  const [siteUrl, setSiteUrl] = useState<string>(initialData?.siteUrl || "");
  const [languageId, setLanguageId] = useState<number>(
    initialData?.languageId || 0
  );
  const [disabled, setDisabled] = useState<boolean>(true);

  const { data: languages } = useGetLanguageListQuery();

  const handleSubmit = async () => {
    const body: Required<
      Omit<UpdateSiteTranslationRequest["body"], "siteUrl">
    > & { siteUrl?: string } = {
      title,
      description,
      languageId,
    };
    if (siteUrl) body.siteUrl = siteUrl;
    if (props.edit) props.onSubmit(body);
    else props.onSubmit({ ...body, siteId: props.siteId });
  };

  useEffect(() => {
    if (title && description && languageId) setDisabled(false);
    else setDisabled(true);
  }, [title, description, languageId]);

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
          label="Title"
          value={title}
          disabled={isLoading}
          size="small"
          margin="dense"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          onChange={(event) => setTitle(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="text"
          label="Description"
          value={description}
          disabled={isLoading}
          size="small"
          margin="dense"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          onChange={(event) => setDescription(event.target.value)}
          fullWidth
        />
      </Grid>
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
        {languages && (
          <FormControl fullWidth margin="dense" variant="standard">
            <InputLabel id="site-translation-form-language">
              Language
            </InputLabel>
            <Select
              labelId="site-translation-form-language"
              label="Language"
              value={languageId}
              onChange={(event) => setLanguageId(event.target.value as number)}
            >
              {languages.data.map((lang) => (
                <MenuItem key={lang.id} value={lang.id}>
                  {lang.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </Grid>
    </FormContainer>
  );
};
