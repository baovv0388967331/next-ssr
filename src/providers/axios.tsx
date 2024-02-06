import { createContext, useContext, useMemo } from 'react';

import Axios, { AxiosInstance } from 'axios';

const AxiosContext = createContext<AxiosInstance>(Axios);

const AxiosProvider = ({ children }: React.PropsWithChildren<unknown>) => {
  const apiURL = process.env.PUBLIC_API_URL;

  const axios = useMemo(() => {
    const axios = Axios.create({
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: Number(process.env.API_TIME_OUT),
      baseURL: apiURL,
    });

    axios.interceptors.request.use((config) => {
      const customConfig = config;

      return customConfig;
    });

    axios.interceptors.response.use(
      function (response) {
        // Handle refresh token
        return response;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    return axios;
  }, []);

  return <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>;
};

const useAxiosInstance = () => {
  return useContext(AxiosContext);
};

export { AxiosContext, AxiosProvider, useAxiosInstance };
