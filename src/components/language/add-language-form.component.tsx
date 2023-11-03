import React from "react";
import {
  CreateLanguageRequest,
  Language,
  useCreateLanguageMutation,
} from "@/services/language";
import { LanguageForm } from "./language-form.component";

interface P {
  onAfterSubmit?: (result: Language) => void;
  onCancel?: () => void;
}

export const AddLanguageForm = ({ onAfterSubmit, onCancel }: P) => {
  const [createLanguage, { error, isLoading, reset }] =
    useCreateLanguageMutation();

  const handleSubmit = async (data: CreateLanguageRequest) => {
    const res = await createLanguage(data).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <LanguageForm
      error={error}
      isLoading={isLoading}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Add language"
    />
  );
};
