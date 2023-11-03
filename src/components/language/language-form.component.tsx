import React, { useState, useEffect } from "react";
import { TextField, Grid } from "@mui/material";
import { CreateLanguageRequest, Language } from "@/services/language";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { SerializedError } from "@reduxjs/toolkit";
import { FormContainer } from "../common";

interface P {
  initialData?: Language;
  error?: FetchBaseQueryError | SerializedError;
  isLoading: boolean;
  onCancel?: () => void;
  onSubmit: (data: CreateLanguageRequest) => void;
  reset: () => void;
  title: string;
}

export const LanguageForm = ({
  initialData,
  error,
  isLoading,
  onCancel,
  onSubmit,
  reset,
  title,
}: P) => {
  const [name, setName] = useState<string>(initialData?.name || "");
  const [shortName, setShortName] = useState<string>(
    initialData?.shortName || ""
  );
  const [code, setCode] = useState<string>(initialData?.code || "");
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleSubmit = () => onSubmit({ name, shortName, code });

  useEffect(() => {
    setDisabled(!name || !shortName || !code);
  }, [name, shortName, code]);

  return (
    <FormContainer
      hasError={disabled}
      loading={isLoading}
      error={error}
      title={title}
      onSubmit={handleSubmit}
      onCancel={onCancel}
      reset={reset}
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
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="text"
          label="Short name"
          value={shortName}
          disabled={isLoading}
          size="small"
          margin="dense"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          onChange={(event) => setShortName(event.target.value)}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          type="text"
          label="Code"
          value={code}
          disabled={isLoading}
          size="small"
          margin="dense"
          variant="standard"
          InputLabelProps={{ shrink: true }}
          onChange={(event) => setCode(event.target.value)}
          fullWidth
          required
        />
      </Grid>
    </FormContainer>
  );
};
