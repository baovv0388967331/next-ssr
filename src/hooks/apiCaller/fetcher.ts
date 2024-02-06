import { AxiosInstance } from 'axios';
import { ClassConstructor } from 'class-transformer';

import { REQUEST_METHOD } from '@/constants/api';
import { ResponseTemplate } from '@/dto/responses/template';
import { AxiosError } from '@/providers';
import { APIConfig } from '@/types/api';
import { convertInstanceToPlain, convertPlainToInstance } from '@/utils';
import { replaceString } from '@/utils/helper';

export type FetcherRequest<TReq> = {
  value?: TReq;
  params?: { [key: string]: string };
};

export type FetcherOptions<TReq, TRes> = {
  axios: AxiosInstance;
  data: FetcherRequest<TReq>;
  api: APIConfig;
  resDto?: ClassConstructor<TRes>;
  onLoading?: (isLoading: boolean) => void;
};

export const fetcher = async <TReq, TRes>(options: FetcherOptions<TReq, TRes>): Promise<ResponseTemplate<TRes>> => {
  const { data, axios, api, resDto, onLoading } = options;
  onLoading && onLoading(true);

  await new Promise((r) => setTimeout(r, 2000));

  if (data.params) {
    api.endPoint = replaceString(api.endPoint, data.params);
  }

  let value = undefined;
  if (data.value) {
    const plainValue = convertInstanceToPlain(data.value);
    value = [REQUEST_METHOD.POST, REQUEST_METHOD.PUT].includes(api.method) ? plainValue : { params: { plainValue } };
  }

  let result: ResponseTemplate<TRes> = { ...new ResponseTemplate<TRes>(), success: true };
  try {
    const res = await axios[api.method]<ResponseTemplate<TRes>>(api.endPoint, value);
    result = { ...res.data, success: true };
  } catch (ex) {
    const error = ex as AxiosError<ResponseTemplate<TRes>>;
    result = { ...(error.response?.data || new ResponseTemplate<TRes>()), success: false };

    //TODO - common error!
  }

  onLoading && onLoading(false);

  if (resDto) {
    return {
      success: result.success,
      ...result.data,
      data: convertPlainToInstance(resDto, result.data || ({} as TRes)),
    };
  }

  return result;
};
