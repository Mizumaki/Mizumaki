import { GetStaticPaths, GetStaticProps, NextPageWithLayout } from 'next';
import Link from 'next/link';
import { ParsedUrlQuery } from 'querystring';
import { DashboardLayout } from '~/components/templates/layouts/DashboardLayout';
import { BlogCategory, isValidBlogCategory } from '~/logics/entity/blogs';
import { fetchBlogPost } from '~/logics/server/fetchBlogPost';
import { fetchBlogPostSlugs } from '~/logics/server/fetchBlogPostSlugs';

type Props = {
  category: BlogCategory;
  items: { slug: string; title: string }[];
};

const LogListPage: NextPageWithLayout<Props> = ({ category, items }) => {
  return (
    <div>
      <h1>{category}</h1>
      <ul>
        {items.map(({ slug, title }) => {
          const href = `/logs/${category}/${slug}`;
          return (
            <Link key={href} href={href}>
              {title}
            </Link>
          );
        })}
      </ul>
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
    props.items.push({ slug: s, title: data.info?.title ?? s });
  }

  return {
    props,
  };
};
