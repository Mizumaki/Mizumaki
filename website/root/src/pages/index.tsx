import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { Fragment } from 'react';
import { Introduction } from '~/components/templates/Introduction';
import { DashboardLayout } from '~/components/templates/layouts/DashboardLayout';

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>Ryota Mizumaki</title>
      </Head>
      <RecoilRoot>
        {/* <DashboardLayout backgroundColor='black' color='white'> */}
        <Introduction />
        {/* </DashboardLayout> */}
      </RecoilRoot>
    </Fragment>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout backgroundColor='black' color='white'>
      {page}
    </DashboardLayout>
  );
};

export default Home;
