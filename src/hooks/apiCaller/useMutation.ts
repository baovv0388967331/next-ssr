import { useMutation as useMutationRoot, UseMutationOptions } from '@tanstack/react-query';
import { ClassConstructor } from 'class-transformer';

import { ResponseTemplate } from '@/dto/responses/template';
import { useAxiosInstance } from '@/providers';
import { useLoading } from '@/providers/loading';
import { APIConfig } from '@/types/api';

import { fetcher, FetcherRequest } from './fetcher';

type MutationOtherOptions<TRes> = {
  loading?: string;
  api: APIConfig;
  resDto?: ClassConstructor<TRes>;
};

type MutationOptions<TReq, TRes> = Omit<
  UseMutationOptions<ResponseTemplate<TRes>, unknown, FetcherRequest<TReq>>,
  'mutationKey' | 'mutationFn'
> &
  MutationOtherOptions<TRes>;

export const useMutation = <TReq = unknown, TRes = unknown>(options: MutationOptions<TReq, TRes>) => {
  const { api, resDto, loading, ...rest } = options;
  const axios = useAxiosInstance();
  const { onLoading } = useLoading();

  const mutation = useMutationRoot({
    mutationFn: (data) =>
      fetcher<TReq, TRes>({
        axios,
        data,
        resDto,
        api,
        onLoading: (isLoading) => !!loading && onLoading(loading, isLoading),
      }),
    mutationKey: [...api.keys],
    ...rest,
  });

  const mutateAsync = async (variables: FetcherRequest<TReq>) => {
    return mutation.mutateAsync(variables);
  };

  return { ...mutation, mutateAsync };
};
