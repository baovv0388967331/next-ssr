import { LAYOUT_TYPE } from '@/constants';
import LayoutContainer from '@/containers/layout';
import { AuthProvider, AxiosProvider, QueryProvider } from '@/providers';

import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';

export type NextComponentWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  layoutType?: LAYOUT_TYPE;
};
type AppWithLayoutProps = AppProps & { Component: NextComponentWithLayout };

const App = ({ Component, pageProps }: AppWithLayoutProps) => {
  return (
    <AxiosProvider>
      <AuthProvider>
        <QueryProvider>
          <LayoutContainer layoutType={Component.layoutType}>
            <Component {...pageProps} />
          </LayoutContainer>
        </QueryProvider>
      </AuthProvider>
    </AxiosProvider>
  );
};

export default App;
