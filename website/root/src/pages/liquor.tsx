import Head from 'next/head';
import { Fragment } from 'react';
import { DashboardLayout } from '~/components/templates/layouts/DashboardLayout';

const Home = () => {
  return (
    <Fragment>
      <Head>
        <title>🥃 | Ryota Mizumaki</title>
      </Head>
      {/* <DashboardLayout backgroundColor='black' color='white'> */}
      <h2>Liquor</h2>
      {/* </DashboardLayout> */}
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
