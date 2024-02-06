import { REQUEST_METHOD } from '@/constants/api';
import { APIConfig } from '@/types/api';

export const getAuthLoginApi = (): APIConfig => ({
  endPoint: '/api/login',
  keys: ['auth', 'login'],
  method: REQUEST_METHOD.POST,
});

export const getAuthMeApi = (): APIConfig => ({
  endPoint: '/api/me',
  keys: ['auth', 'me'],
  method: REQUEST_METHOD.GET,
});
