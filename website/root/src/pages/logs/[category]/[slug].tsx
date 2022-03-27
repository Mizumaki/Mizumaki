import type { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import type { ParsedUrlQuery } from 'querystring';
import { BlogCategory, isValidBlogCategory } from '~/logics/entity/blogs';
import { fetchBlogPost } from '~/logics/server/fetchBlogPost';
import { fetchBlogPostSlugs } from '~/logics/server/fetchBlogPostSlugs';

type Props = {
  htmlText: string;
};

const BlogPostPage: React.VFC<Props> = ({ htmlText }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <div>loading</div>;
  }

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: htmlText }} />
    </div>
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
      htmlText: data.html,
    },
  };
};
