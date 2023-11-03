export type Language = {
  id: number;
  name: string;
  shortName: string;
  code: string;
};

export type GetLanguageListRequest = void;
export type GetLanguageListResponse = {
  data: Language[];
};

export type GetLanguageRequest = number;
export type GetLanguageResponse = Language;

export type CreateLanguageResponse = Language;
export type CreateLanguageRequest = Omit<Language, "id">;

export type UpdateLanguageResponse = Language;
export type UpdateLanguageRequest = {
  id: number;
  body: Partial<CreateLanguageRequest>;
};

export type DeleteLanguageResponse = boolean;
export type DeleteLanguageRequest = number;
