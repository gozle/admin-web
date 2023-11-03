import { PaginatedRequest, PaginatedResponse } from "@/lib/type";

export type Feedback = {
  id: number;
  name: string;
  email: string | null;
  text: string;
  checked: number;
  createdAt: string;
  createdAtDate: string;
  deletedAt?: string | null;
};

export type GetFeedbackListRequest = PaginatedRequest & {
  withDeleted?: number;
};
export type GetFeedbackListResponse = PaginatedResponse<Feedback>;

export type GetFeedbackRequest = number;
export type GetFeedbackResponse = Feedback;

export type DeleteFeedbackResponse = boolean;
export type DeleteFeedbackRequest = { id: number; permanently?: boolean };

export type CheckFeedbackResponse = boolean;
export type CheckFeedbackRequest = number;

export type RecoverFeedbackResponse = boolean;
export type RecoverFeedbackRequest = number;
