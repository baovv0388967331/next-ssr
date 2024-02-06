import { REQUEST_METHOD } from '@/constants/api';

export type APIConfig = {
  keys: unknown[];
  endPoint: string;
  method: REQUEST_METHOD;
  fake?: unknown;
};
