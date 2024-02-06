export type FetcherRequest<TReq> = {
  value?: TReq;
  params?: { [key: string]: string | number };
};
