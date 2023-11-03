import { httpErrorSerializer } from "@/lib/serializers";
import { HttpError } from "@/lib/type";
import { Grid, Typography } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import React, { ReactNode, useCallback, useEffect } from "react";

import { CancelButton, SaveButton } from "../base/buttons";

type Props = {
  hasError: boolean;
  loading: boolean;
  error?: FetchBaseQueryError | SerializedError;
  title: string;
  children: ReactNode;
  onSubmit: () => void;
  onCancel?: () => void;
  reset: () => void;
};

export const FormContainer = ({
  hasError,
  loading,
  error,
  title,
  children,
  onSubmit,
  onCancel,
  reset,
}: Props) => {
  useEffect(() => {
    if (error) {
      const timeout = setTimeout(() => reset(), 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [error, reset]);

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      if (hasError) return;

      onSubmit();
    },
    [hasError, onSubmit]
  );

  return (
    <form onSubmit={handleSubmit}>
      <Grid container flexDirection="column" spacing={2}>
        <Grid item>
          <Typography variant="h6">{title}</Typography>
        </Grid>
        {children}
        {error && (
          <Typography variant="body1" color="error">
            {"data" in error
              ? httpErrorSerializer(error.data as HttpError)
              : JSON.stringify(error)}
          </Typography>
        )}
        <Grid item display="flex" justifyContent="flex-end">
          <SaveButton
            type="submit"
            disabled={loading || hasError}
            sx={onCancel ? { mr: 1 } : undefined}
          />

          {onCancel && <CancelButton onClick={onCancel} disabled={loading} />}
        </Grid>
      </Grid>
    </form>
  );
};
