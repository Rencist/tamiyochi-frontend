export type UninterceptedApiError = {
  code: number;
  status: string;
  message: string | Record<string, string[]>;
};

export type ApiReturn<T> = {
  code: string;
  status: string;
  data: T;
};

type PaginateData<T> = {
  data_per_page: T;
  meta: {
    page: number;
    per_page: number;
    max_page: number;
    total_data: number;
  };
};

export type PaginatedApiResponse<T> = {
  code: number;
  success: string;
  data: PaginateData<T>;
};
