import { SiteCategoryTranslation } from "./site-category-translation.type";

export type SiteCategory = {
  id: number;
  slug: string;
  translations?: SiteCategoryTranslation[];
  deletedAt: string | null;
};

export type GetSiteCategoryListRequest = void;
export type GetSiteCategoryListResponse = { data: SiteCategory[] };

export type GetSiteCategoryRequest = number;
export type GetSiteCategoryResponse = SiteCategory;

export type CreateSiteCategoryResponse = SiteCategory;
export type CreateSiteCategoryRequest = Omit<
  SiteCategory,
  "id" | "translations" | "deletedAt"
>;

export type UpdateSiteCategoryResponse = SiteCategory;
export type UpdateSiteCategoryRequest = {
  id: number;
  body: Partial<CreateSiteCategoryRequest>;
};

export type DeleteSiteCategoryResponse = boolean;
export type DeleteSiteCategoryRequest = { id: number; permanently?: boolean };

export type RecoverSiteCategoryResponse = boolean;
export type RecoverSiteCategoryRequest = number;
