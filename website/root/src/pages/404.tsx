import { DashboardLayout } from '~/components/templates/layouts/DashboardLayout';

const NotFoundPage = () => {
  return (
    <div style={{ margin: '1em' }}>
      <h2>404 - Page Not Found</h2>
      <p>ページが見つかりませんでした。</p>
    </div>
  );
};

NotFoundPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout backgroundColor='red' color='#fff'>
      {page}
    </DashboardLayout>
  );
};

export default NotFoundPage;
