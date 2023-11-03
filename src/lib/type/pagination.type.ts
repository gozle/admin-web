export type PaginationRequest = {
  page: number;
  amount: number;
};

export type PaginatedRequest = {
  pagination: PaginationRequest;
};

export type PaginationResponse = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
};

export type PaginatedResponse<T> = {
  data: T[];
  pagination: PaginationResponse;
};
