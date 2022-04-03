import { NextPageWithLayout } from 'next';
import Head from 'next/head';
import { Fragment } from 'react';
import { Introduction } from '~/components/templates/Introduction';
import { DashboardLayout } from '~/components/templates/layouts/DashboardLayout';
import styles from './index.module.css';

const Home: NextPageWithLayout = () => {
  return (
    <Fragment>
      <Head>
        <title>Ryota Mizumaki</title>
      </Head>
      <div className={styles.introductionContainer}>
        <Introduction />
      </div>
    </Fragment>
  );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout backgroundColor='#05010D' color='#fff'>
      {page}
    </DashboardLayout>
  );
};

export default Home;
