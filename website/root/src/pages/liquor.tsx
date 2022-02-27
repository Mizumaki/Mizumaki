import Head from 'next/head';
import { Fragment } from 'react';
import { DashboardLayout } from '~/components/templates/layouts/DashboardLayout';
import { LiquorDetail } from '~/components/templates/LiquorDetail';

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>🥃 | Ryota Mizumaki</title>
      </Head>
      <LiquorDetail />
    </Fragment>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout backgroundColor='#2b2724' color='white'>
      {page}
    </DashboardLayout>
  );
};

export default Home;
