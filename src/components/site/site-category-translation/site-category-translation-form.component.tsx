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
  CreateSiteCategoryTranslationRequest,
  UpdateSiteCategoryTranslationRequest,
  SiteCategoryTranslation,
} from "@/services/site";
import { FormContainer } from "@/components/common";

type P = {
  initialData?: SiteCategoryTranslation;
  error?: FetchBaseQueryError | SerializedError;
  isLoading: boolean;
  onCancel?: () => void;
  reset: () => void;
  title: string;
} & (
  | {
      edit: false;
      siteCategoryId: number;
      onSubmit: (data: CreateSiteCategoryTranslationRequest) => void;
    }
  | {
      edit: true;
      onSubmit: (data: UpdateSiteCategoryTranslationRequest["body"]) => void;
    }
);

export const SiteCategoryTranslationForm = ({
  initialData,
  error,
  isLoading,
  ...props
}: P) => {
  const [name, setName] = useState<string>(initialData?.name || "");
  const [languageId, setLanguageId] = useState<number>(
    initialData?.languageId || 0
  );
  const [disabled, setDisabled] = useState<boolean>(true);

  const { data: languages } = useGetLanguageListQuery();

  const handleSubmit = async () => {
    const body: Required<UpdateSiteCategoryTranslationRequest["body"]> = {
      name,
      languageId,
    };
    if (props.edit) props.onSubmit(body);
    else props.onSubmit({ ...body, siteCategoryId: props.siteCategoryId });
  };

  useEffect(() => {
    setDisabled(!name || !languageId);
  }, [name, languageId]);

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
          label="Name"
          value={name}
          disabled={isLoading}
          size="small"
          margin="dense"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          onChange={(event) => setName(event.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={12}>
        {languages && (
          <FormControl fullWidth margin="dense" variant="standard">
            <InputLabel id="site-category-translation-form-language">
              Language
            </InputLabel>
            <Select
              labelId="site-category-translation-form-language"
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
