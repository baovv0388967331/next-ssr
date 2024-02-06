import { ResponseTemplate } from '@/dto/responses/template';
import { useAxiosInstance } from '@/providers';
import { APIConfig } from '@/types/api';
import { useMutation as useMutationRoot, UseMutationOptions } from '@tanstack/react-query';

import { ClassConstructor } from 'class-transformer';

import { FetcherRequest } from './declare';
import { fetcher } from './fetcher';

type MutationOtherOptions<TRes> = {
  api: APIConfig;
  resDto?: ClassConstructor<TRes>;
};

type MutationOptions<TReq, TRes> = Omit<
  UseMutationOptions<ResponseTemplate<TRes>, unknown, FetcherRequest<TReq>>,
  'mutationKey' | 'mutationFn'
> &
  MutationOtherOptions<TRes>;

export const useMutation = <TReq = unknown, TRes = unknown>(options: MutationOptions<TReq, TRes>) => {
  const { api, resDto, ...rest } = options;

  const axios = useAxiosInstance(); //TODO

  const mutation = useMutationRoot({
    mutationFn: (data) => fetcher<TReq, TRes>({ axios, data, api, resDto }),
    mutationKey: [...api.keys],
    ...rest,
  });

  const mutateAsync = (variables: FetcherRequest<TReq>) => mutation.mutateAsync(variables);

  return { ...mutation, mutateAsync };
};
