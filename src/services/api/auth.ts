import { REQUEST_METHOD } from '@/constants/api';
import { APIConfig } from '@/types/api';

export const getAuthLoginApi = (): APIConfig => ({
  endPoint: '/api/login',
  keys: ['login'],
  method: REQUEST_METHOD.POST,
  fake: {
    success: false,
    data: {},
    messageCode: 1001,
    errors: {
      password: 'Mail or pass word wrong',
    },
  },
});
