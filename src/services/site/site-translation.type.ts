import { OptionalNullable } from "@/lib/type";
import { Language } from "../language";
import { Site } from "./site.type";

export type SiteTranslation = {
  id: number;
  title: string;
  description: string;
  languageId: number;
  language?: Language;
  siteId: number;
  site?: Site;
  siteUrl: string | null;
  deletedAt: string | null;
};

export type GetSiteTranslationListFilter = {
  languageId?: number;
  categoryId?: number;
  siteId?: number;
};
export type GetSiteTranslationListRequest = {
  filters: GetSiteTranslationListFilter;
};
export type GetSiteTranslationListResponse = {
  data: SiteTranslation[];
};

export type GetSiteTranslationRequest = number;
export type GetSiteTranslationResponse = SiteTranslation;

export type CreateSiteTranslationResponse = SiteTranslation;
export type CreateSiteTranslationRequest = OptionalNullable<
  Omit<SiteTranslation, "id" | "site" | "language" | "deletedAt">
>;

export type UpdateSiteTranslationResponse = SiteTranslation;
export type UpdateSiteTranslationRequest = {
  id: number;
  siteId: number;
  body: Partial<Omit<CreateSiteTranslationRequest, "siteId">>;
};

export type DeleteSiteTranslationResponse = boolean;
export type DeleteSiteTranslationRequest = {
  id: number;
  siteId: number;
  permanently?: boolean;
};

export type RecoverSiteTranslationResponse = boolean;
export type RecoverSiteTranslationRequest = {
  id: number;
  siteId: number;
};
