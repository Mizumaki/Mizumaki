import type { BlogCategory, BlogPostInfo } from '../entity/blogs';
import { LogicError, LogicRes } from '../type';
import { fetchGitBlob, getRepoInfoFromCategory, searchGitHub } from './github';
import { parseMarkdown } from '../parseMarkdown';
import { SimpleCache } from '~/utils/SimpleCache';

type BlogPost = {
  html: string;
  info?: BlogPostInfo;
};

// TODO: GitHub のロジックを別サーバーに切り出したら、ここら辺も良い感じに
const cache = new SimpleCache<{ [slug in string]: BlogPost }>();
export const fetchBlogPost = async (category: BlogCategory, slug: string): Promise<LogicRes<BlogPost>> => {
  const cachedPost = cache.get(`${category}_${slug}`);
  if (cachedPost) return [undefined, cachedPost];

  try {
    const repoInfo = getRepoInfoFromCategory(category);

    const searchResult = await searchGitHub({ ...repoInfo, filename: slug });
    if (searchResult.data.items.length > 1) {
      return [new LogicError(`fetchBlogPost failed: search result of ${slug} more than 1`)];
    }
    const item = searchResult.data.items[0];
    if (item === undefined) {
      return [new LogicError(`fetchBlogPost failed: search result of ${slug} is 0`)];
    }
    const blob = await fetchGitBlob({ ...repoInfo, sha: item.sha });
    const markdown = Buffer.from(blob.data.content, 'base64').toString();
    const { html, info } = parseMarkdown(markdown);

    cache.set(`${category}_${slug}`, { html, info }, 30000);

    return [
      undefined,
      {
        html,
        info,
      },
    ];
  } catch (e: unknown) {
    return [new LogicError('fetchBlogPost failed', e)];
  }
};
