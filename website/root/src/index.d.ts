import type { NextPage } from 'next';
import type { ReactElement } from 'react';

declare module 'next' {
  type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactElement;
  };
}
