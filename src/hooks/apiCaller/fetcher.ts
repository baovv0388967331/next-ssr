import { REQUEST_METHOD } from '@/constants/api';
import { ResponseTemplate } from '@/dto/responses/template';
import { APIConfig } from '@/types/api';
import { sleep } from '@/utils';

import { AxiosError, AxiosInstance } from 'axios';
import { ClassConstructor, instanceToPlain, plainToInstance } from 'class-transformer';

import { FetcherRequest } from './declare';

export type FetcherOptions<TReq, TRes> = {
  axios: AxiosInstance;
  data: FetcherRequest<TReq>;
  api: APIConfig;
  resDto?: ClassConstructor<TRes>;
};

export const fetcher = async <TReq, TRes>(options: FetcherOptions<TReq, TRes>): Promise<ResponseTemplate<TRes>> => {
  const { data, api, axios, resDto } = options;
  if (api.fake) {
    await sleep(2000);
    return api.fake as ResponseTemplate<TRes>;
  }

  const endPoint = api.endPoint;
  if (data.params) {
    endPoint.replace('', ''); //TODO
  }

  let dataBuilder = {};
  if (data.value) {
    dataBuilder = instanceToPlain(data.value, { excludeExtraneousValues: true });
  }

  let value: object = { ...dataBuilder };
  if ([REQUEST_METHOD.GET].includes(api.method)) {
    value = { params: { ...dataBuilder } };
  }

  let result: ResponseTemplate<TRes> = { ...new ResponseTemplate<TRes>(), success: true };
  try {
    const res = await axios[api.method]<ResponseTemplate<TRes>>(api.endPoint, value);

    result = { ...res.data, success: true };
  } catch (ex) {
    const error = ex as AxiosError<ResponseTemplate<TRes>>;
    result = { ...(error.response?.data || new ResponseTemplate<TRes>()), success: false };
  }

  if (resDto) {
    return {
      success: result.success,
      ...result.data,
      data: plainToInstance(resDto, result.data) || ({} as TRes),
    };
  }

  return result;
};
