import type { GetStaticPaths, GetStaticProps, NextPageWithLayout } from 'next';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { DashboardLayout } from '~/components/templates/layouts/DashboardLayout';
import { BlogCategory, isValidBlogCategory } from '~/logics/entity/blogs';
import { fetchBlogPost } from '~/logics/server/fetchBlogPost';
import { fetchBlogPostSlugs } from '~/logics/server/fetchBlogPostSlugs';

type Props = {
  title: string;
  htmlText: string;
};

const BlogPostPage: NextPageWithLayout<Props> = ({ title, htmlText }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>loading</div>;
  }

  return (
    <div>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlText }} />
    </div>
  );
};

BlogPostPage.getLayout = function getLayout(page) {
  return (
    <DashboardLayout backgroundColor='#2b2724' color='white'>
      {page}
    </DashboardLayout>
  );
};

export default BlogPostPage;

interface Params<T extends string = string> extends ParsedUrlQuery {
  category: T;
  slug: string;
}

export const getStaticPaths: GetStaticPaths<Params<BlogCategory>> = async () => {
  const [err, dailyLogSlugs] = await fetchBlogPostSlugs('daily');
  if (err) {
    throw err;
  }
  const paths: { params: Params<BlogCategory> }[] = [];
  for (const s of dailyLogSlugs) {
    paths.push({ params: { category: 'daily', slug: s } });
  }
  return {
    paths,
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

  const [err, data] = await fetchBlogPost(params.category, params.slug);
  if (err) {
    // Currently this codes are not used (because of `next export`)
    // TODO: This should not be always 404
    return { notFound: true };
  }

  return {
    props: {
      // TODO: Handle when title is undefined
      title: data.info?.title ?? '',
      htmlText: data.html,
    },
  };
};
