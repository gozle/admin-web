import React from "react";
import {
  CreateLanguageRequest,
  Language,
  useUpdateLanguageMutation,
} from "@/services/language";
import { LanguageForm } from "./language-form.component";

interface P {
  initialData: Language;
  onAfterSubmit?: (result: Language) => void;
  onCancel?: () => void;
}

export const EditLanguageForm = ({
  initialData,
  onAfterSubmit,
  onCancel,
}: P) => {
  const [updateLanguage, { error, isLoading, reset }] =
    useUpdateLanguageMutation();

  const handleSubmit = async (data: CreateLanguageRequest) => {
    const res = await updateLanguage({
      id: initialData.id,
      body: data,
    }).unwrap();
    onAfterSubmit?.(res);
  };

  return (
    <LanguageForm
      initialData={initialData}
      error={error}
      isLoading={isLoading}
      onCancel={onCancel}
      onSubmit={handleSubmit}
      reset={reset}
      title="Edit language"
    />
  );
};
