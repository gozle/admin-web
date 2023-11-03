import { PaginatedRequest, PaginatedResponse } from "@/lib/type";
import { BlogPostTranslation } from "./blog-post-translation.type";

export type BlogPost = {
  id: number;
  image: string;
  translations?: BlogPostTranslation[];
  deletedAt: string | null;
};

export type GetBlogPostListRequest = PaginatedRequest;
export type GetBlogPostListResponse = PaginatedResponse<BlogPost>;

export type GetBlogPostRequest = number;
export type GetBlogPostResponse = BlogPost;

export type CreateBlogPostResponse = BlogPost;
export type CreateBlogPostDTO = Omit<
  BlogPost,
  "id" | "translations" | "deletedAt"
>;
export type CreateBlogPostRequest = CreateBlogPostDTO | FormData;

export type UpdateBlogPostResponse = BlogPost;
export type UpdateBlogPostRequest = {
  id: number;
  body: Partial<CreateBlogPostRequest> | FormData;
};

export type DeleteBlogPostRequest = { id: number; permanently?: boolean };
export type DeleteBlogPostResponse = boolean;

export type RecoverBlogPostRequest = number;
export type RecoverBlogPostResponse = boolean;
