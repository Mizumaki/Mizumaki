import { BlogCategory } from '../entity/blogs';
import { LogicError, LogicRes } from '../type';
import { fetchGitBlob, getRepoInfoFromCategory, searchGitHub } from './github';
import { marked } from 'marked';

type BlogPost = {
  html: string;
};

export const fetchBlogPost = async (category: BlogCategory, slug: string): Promise<LogicRes<BlogPost>> => {
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
    // TODO: Share `sha` from fetchBlogPostSlugs and use it (skip `searchGitHub` as far as possible)
    const blob = await fetchGitBlob({ ...repoInfo, sha: item.sha });
    const markdown = Buffer.from(blob.data.content, 'base64').toString();
    const html = marked(markdown);
    return [
      undefined,
      {
        html,
      },
    ];
  } catch (e: unknown) {
    return [new LogicError('fetchBlogPost failed', e)];
  }
};
