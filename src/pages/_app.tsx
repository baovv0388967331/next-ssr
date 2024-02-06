import '@/styles/globals.css';

import { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { LAYOUT_TYPE } from '@/constants';
import LayoutContainer from '@/containers/layout';
import { AuthProvider, LoadingProvider, QueryProvider, TransportProvider } from '@/providers';

export type NextComponentWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  layoutType?: LAYOUT_TYPE;
};
type AppWithLayoutProps = AppProps & { Component: NextComponentWithLayout };

const App = ({ Component, pageProps }: AppWithLayoutProps) => {
  return (
    <AuthProvider>
      <QueryProvider>
        <TransportProvider>
          <LoadingProvider>
            <LayoutContainer layoutType={Component.layoutType}>
              <Component {...pageProps} />
            </LayoutContainer>
          </LoadingProvider>
        </TransportProvider>
      </QueryProvider>
    </AuthProvider>
  );
};

export default App;
