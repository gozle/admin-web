import { OptionalNullable } from "@/lib/type";
import { Language } from "../language";
import { BlogPost } from "./blog-post.type";

export type BlogPostTranslation = {
  id: number;
  title: string;
  text: string;
  blogPostId: number;
  blogPost?: BlogPost;
  languageId: number;
  language?: Language;
  deletedAt: string | null;
};

export type GetBlogPostTranslationListFilter = {
  languageId?: number;
  blogPostId?: number;
};

export type GetBlogPostTranslationListRequest = {
  filters: GetBlogPostTranslationListFilter;
};
export type GetBlogPostTranslationListResponse = {
  data: BlogPostTranslation[];
};

export type CreateBlogPostTranslationResponse = BlogPostTranslation;
export type CreateBlogPostTranslationRequest = OptionalNullable<
  Omit<BlogPostTranslation, "id" | "blogPost" | "language" | "deletedAt">
>;

export type UpdateBlogPostTranslationResponse = BlogPostTranslation;
export type UpdateBlogPostTranslationRequest = {
  id: number;
  blogPostId: number;
  body: Partial<Omit<CreateBlogPostTranslationRequest, "blogPostId">>;
};

export type DeleteBlogPostTranslationResponse = boolean;
export type DeleteBlogPostTranslationRequest = {
  id: number;
  blogPostId: number;
  permanently?: boolean;
};

export type RecoverBlogPostTranslationResponse = boolean;
export type RecoverBlogPostTranslationRequest = {
  id: number;
  blogPostId: number;
};
