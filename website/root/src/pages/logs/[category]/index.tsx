import { GetStaticPaths, GetStaticProps, NextPageWithLayout } from 'next';
import { ParsedUrlQuery } from 'querystring';
import { useMemo } from 'react';
import { BlogPostList } from '~/components/molecules/BlogPostList';
import { DashboardLayout } from '~/components/templates/layouts/DashboardLayout';
import { BlogCategory, isValidBlogCategory } from '~/logics/entity/blogs';
import { fetchBlogPost } from '~/logics/server/fetchBlogPost';
import { fetchBlogPostSlugs } from '~/logics/server/fetchBlogPostSlugs';
import styles from './index.module.css';

type Props = {
  category: BlogCategory;
  items: { slug: string; title: string; date: string }[];
};

const LogListPage: NextPageWithLayout<Props> = ({ category, items }) => {
  const posts = useMemo(() => {
    return items.map(({ slug, title, date }) => {
      return {
        href: `/logs/${category}/${slug}`,
        title,
        date,
      };
    });
  }, [items]);

  return (
    <div>
      <h1 className={styles.capitalize}>{category} work</h1>
      <BlogPostList items={posts} />
    </div>
  );
};

LogListPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <DashboardLayout backgroundColor='#2b2724' color='white'>
      {page}
    </DashboardLayout>
  );
};

export default LogListPage;

interface Params<T extends string = string> extends ParsedUrlQuery {
  category: T;
}

export const getStaticPaths: GetStaticPaths<Params<BlogCategory>> = () => {
  return {
    paths: [
      {
        params: { category: 'daily' },
      },
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({ params }) => {
  // Currently these codes are not used (because of `next export`)
  if (!params || !isValidBlogCategory(params.category)) {
    return {
      notFound: true,
    };
  }

  const [err, dailyLogSlugs] = await fetchBlogPostSlugs('daily');
  if (err) {
    throw err;
  }

  const props: Props = { category: params.category, items: [] };
  for (const s of dailyLogSlugs) {
    const [err2, data] = await fetchBlogPost(params.category, s);
    if (err2) {
      // Currently this codes are not used (because of `next export`)
      // TODO: This should not be always 404
      return { notFound: true };
    }
    props.items.push({ slug: s, title: data.info.title, date: data.info.date });
  }

  return {
    props,
  };
};
