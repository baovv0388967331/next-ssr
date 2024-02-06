import { AuthLoginReqDto } from '@/dto/requests';
import { AuthLoginResDto } from '@/dto/responses';
import { useMutation } from '@/hooks/apiCaller';
import { getAuthLoginApi } from '@/services/api/auth';

import { Loading, LoginFormDto } from '../declare';

export const useLogic = () => {
  const { mutateAsync } = useMutation<AuthLoginReqDto, AuthLoginResDto>({
    api: getAuthLoginApi(),
    resDto: AuthLoginResDto,
    loading: Loading.submit,
  });

  const handleLogin = async (value: LoginFormDto) => {
    const reqData = new AuthLoginReqDto(value);

    const { data, success } = await mutateAsync({ value: reqData });
    if (success) {
      data.accessToken;
    } else {
      data.accessToken;
    }
  };

  return {
    onLogin: handleLogin,
  };
};
