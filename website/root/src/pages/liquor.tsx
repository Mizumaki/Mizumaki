import Head from 'next/head';
import { Fragment } from 'react';
import { DashboardLayout } from '~/components/templates/layouts/DashboardLayout';

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>🥃 | Ryota Mizumaki</title>
      </Head>
      <h2>Liquor</h2>
    </Fragment>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout backgroundColor='pink' color='white'>
      {page}
    </DashboardLayout>
  );
};

export default Home;
