import { SiteCategory } from "./site-category.type";
import { SiteTranslation } from "./site-translation.type";

export type Site = {
  id: number;
  logo: string;
  siteUrl: string;
  category?: SiteCategory;
  categoryId: number;
  translations?: SiteTranslation[];
  deletedAt: string | null;
};

export type GetSiteListRequest = { categoryId?: number };
export type GetSiteListResponse = { data: Site[] };

export type GetSiteRequest = number;
export type GetSiteResponse = Site;

export type CreateSiteResponse = Site;
export type CreateSiteDTO = Omit<Site, "id" | "translations" | "deletedAt">;
export type CreateSiteRequest = CreateSiteDTO | FormData;

export type UpdateSiteResponse = Site;
export type UpdateSiteRequest = {
  id: number;
  body: Partial<CreateSiteDTO> | FormData;
};

export type DeleteSiteResponse = boolean;
export type DeleteSiteRequest = { id: number; permanently?: boolean };

export type RecoverSiteResponse = boolean;
export type RecoverSiteRequest = number;
