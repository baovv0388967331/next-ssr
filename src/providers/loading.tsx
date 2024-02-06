import { createContext, useContext, useState } from 'react';

type Props = {
  children?: React.ReactNode;
};

type LoadingProps = {
  getLoading: (key: string) => boolean;
  onLoading: (key: string, isLoading: boolean) => void;
};

const LoadingContext = createContext<LoadingProps>({} as LoadingProps);

export const LoadingProvider = ({ children }: Props) => {
  const [state, setState] = useState<{ [key: string]: boolean }>({ '': false });

  const getLoading = (key: string) => {
    return !!state && state[key];
  };

  const onLoading = (key: string, isLoading: boolean) => {
    setState((prev) => ({ ...prev, [key]: isLoading }));
  };

  return <LoadingContext.Provider value={{ getLoading, onLoading }}>{children}</LoadingContext.Provider>;
};

export const useLoading = () => {
  return useContext(LoadingContext);
};
