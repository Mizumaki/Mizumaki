import '../styles/reset.css';
import '../styles/base.css';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || (page => page);
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
        <meta name='application-name' content='' />
        <meta name='description' content='' />
        <meta name='author' content='Ryota Mizumaki' />
        {/* <!-- 対象年齢の指定 --> */}
        <meta name='rating' content='General' />
        {/* <!-- スタンドアローンモードでのサイトの起動を許可 --> */}
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        {/* <!-- スタンドアローンモードでのステータスバーのデザインを指定 --> */}
        <meta name='apple-mobile-web-app-capable-status-bar-style' content='black-translucent' />
        <meta name='theme-color' content='#152231' />
        {/* <!-- SNS用OGPタグ 一部保留 --> */}
        <meta property='og:type' content='article' />
        <meta name='twitter:site' content='@RyotaMizumaki' />
        <meta name='twitter:card' content='summary' />
        {/* TODO: Add manifest.json */}
        {/* <link rel='manifest' href='/manifest.json' /> */}
        {/* TODO: Add favicon */}
        {/* <link rel='shortcut icon' href='/favicon.ico' /> */}
        {/* Font を preload */}
        <link rel='preload' href='/fonts/x16y32pxGridGazer.ttf' as='font' />
        <link rel='preload' href='/fonts/x12y16pxMaruMonica.ttf' as='font' />
      </Head>
      <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
    </>
  );
}
