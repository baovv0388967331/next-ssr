import { AuthLoginReqDto } from '@/dto/requests';
import { AuthLoginResDto } from '@/dto/responses';
import { useMutation, useQuery } from '@/hooks/apiCaller';
import { getAuthLoginApi } from '@/services/api/auth';

import { AuthFormState } from '../declare';

export const useLogic = () => {
  const { data, isLoading } = useQuery<AuthLoginReqDto, AuthLoginResDto>({
    api: getAuthLoginApi(),
    resDto: AuthLoginResDto,
    enabled: false,
  });

  const { mutateAsync, isPending } = useMutation<AuthLoginReqDto, AuthLoginResDto>({
    api: getAuthLoginApi(),
    resDto: AuthLoginResDto,
  });

  const handleLogin = async (value: AuthFormState) => {
    const reqData = new AuthLoginReqDto(value);

    const { data, success } = await mutateAsync({ value: reqData });

    if (success) {
      data.accessToken;
    } else {
      return data.accessToken;
    }
  };

  return {
    data: data?.messageCode,
    isLoading,
    isPending,
    onLogin: handleLogin,
  };
};
