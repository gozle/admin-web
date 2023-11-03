import { OptionalNullable } from "@/lib/type";
import { Language } from "../language";
import { SiteCategory } from "./site-category.type";

export type SiteCategoryTranslation = {
  id: number;
  name: string;
  languageId: number;
  language?: Language;
  siteCategoryId: number;
  siteCategory?: SiteCategory;
  deletedAt: string | null;
};

export type GetSiteCategoryTranslationListFilter = {
  languageId?: number;
  siteCategoryId?: number;
};
export type GetSiteCategoryTranslationListRequest = {
  filters: GetSiteCategoryTranslationListFilter;
};
export type GetSiteCategoryTranslationListResponse = {
  data: SiteCategoryTranslation[];
};

export type GetSiteCategoryTranslationRequest = number;
export type GetSiteCategoryTranslationResponse = SiteCategoryTranslation;

export type CreateSiteCategoryTranslationResponse = SiteCategoryTranslation;
export type CreateSiteCategoryTranslationRequest = OptionalNullable<
  Omit<
    SiteCategoryTranslation,
    "id" | "siteCategory" | "language" | "deletedAt"
  >
>;

export type UpdateSiteCategoryTranslationResponse = SiteCategoryTranslation;
export type UpdateSiteCategoryTranslationRequest = {
  id: number;
  siteCategoryId: number;
  body: Partial<Omit<CreateSiteCategoryTranslationRequest, "siteCategoryId">>;
};

export type DeleteSiteCategoryTranslationResponse = boolean;
export type DeleteSiteCategoryTranslationRequest = {
  id: number;
  siteCategoryId: number;
  permanently?: boolean;
};

export type RecoverSiteCategoryTranslationResponse = boolean;
export type RecoverSiteCategoryTranslationRequest = {
  id: number;
  siteCategoryId: number;
};
