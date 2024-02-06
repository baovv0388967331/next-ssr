import { ResponseTemplate } from '@/dto/responses/template';
import { useAxiosInstance } from '@/providers';
import { APIConfig } from '@/types/api';
import { useQuery as useQueryRoot, UseQueryOptions } from '@tanstack/react-query';
import { useMemo } from 'react';

import { ClassConstructor } from 'class-transformer';

import { fetcher } from './fetcher';

type QueryOtherOptions<TReq, TRes> = {
  api: APIConfig;
  queries?: TReq;
  resDto?: ClassConstructor<TRes>;
  onFinally?: (data?: ResponseTemplate<TRes>) => void;
};

type QueryOptions<TReq, TRes> = Omit<UseQueryOptions<ResponseTemplate<TRes>>, 'queryKey' | 'queryFn'> &
  QueryOtherOptions<TReq, TRes>;

export const useQuery = <TReq, TRes>(options: QueryOptions<TReq, TRes>) => {
  const { api, queries, resDto, onFinally, ...rest } = options;

  const axios = useAxiosInstance(); //TODO

  const queryKey: unknown[] = useMemo(() => {
    return [...api.keys, JSON.stringify(queries)];
  }, [api, queries]);

  const query = useQueryRoot({
    queryKey,
    queryFn: () => fetcher<TReq, TRes>({ data: { value: queries }, resDto, api, axios }),
    refetchOnWindowFocus: false,
    ...rest,
  });
  //TODO
  onFinally && onFinally(query.data);

  return query;
};
