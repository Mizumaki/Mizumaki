import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { Fragment } from 'react';

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>Ryota Mizumaki</title>
      </Head>
      <RecoilRoot>
        <h1 className='hello'>Hello World</h1>
      </RecoilRoot>
    </Fragment>
  );
};

export default Home;
