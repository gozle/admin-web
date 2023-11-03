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
  BlogPostTranslation,
  CreateBlogPostTranslationRequest,
  UpdateBlogPostTranslationRequest,
} from "@/services/blog";
import MDEditor from "@uiw/react-md-editor";
import { FormContainer } from "../common";

type P = {
  initialData?: BlogPostTranslation;
  error?: FetchBaseQueryError | SerializedError;
  isLoading: boolean;
  onCancel?: () => void;
  reset: () => void;
  title: string;
} & (
  | {
      edit: false;
      blogPostId: number;
      onSubmit: (data: CreateBlogPostTranslationRequest) => void;
    }
  | {
      edit: true;
      onSubmit: (data: UpdateBlogPostTranslationRequest["body"]) => void;
    }
);

export const BlogPostTranslationForm = ({
  initialData,
  error,
  isLoading,
  ...props
}: P) => {
  const [title, setTitle] = useState<string>(initialData?.title || "");
  const [text, setText] = useState<string>(initialData?.text || "");
  const [languageId, setLanguageId] = useState<number>(
    initialData?.languageId || 0
  );
  const [disabled, setDisabled] = useState<boolean>(true);

  const { data: languages } = useGetLanguageListQuery();

  const handleSubmit = async () => {
    const body: Required<UpdateBlogPostTranslationRequest["body"]> = {
      title,
      text,
      languageId,
    };
    if (props.edit) props.onSubmit(body);
    else props.onSubmit({ ...body, blogPostId: props.blogPostId });
  };

  useEffect(() => {
    setDisabled(!title || !text || !languageId);
  }, [title, text, languageId]);

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
          multiline
          minRows={1}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControl
          fullWidth
          margin="dense"
          variant="standard"
          sx={{ pt: "20px" }}
        >
          <InputLabel id="blog-post-translation-form-text" shrink={true}>
            Text
          </InputLabel>
          <MDEditor value={text} onChange={(text) => setText(text || "")} />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        {languages && (
          <FormControl fullWidth margin="dense" variant="standard">
            <InputLabel id="blog-post-translation-form-language">
              Language
            </InputLabel>
            <Select
              labelId="blog-post-translation-form-language"
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
