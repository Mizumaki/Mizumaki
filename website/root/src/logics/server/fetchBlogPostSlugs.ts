import path from 'path';
import type { BlogCategory } from '../entity/blogs';
import { LogicRes, LogicError } from '../type';
import { fetchGitTree, getRepoInfoFromCategory } from './github';

export const fetchBlogPostSlugs = async (category: BlogCategory): Promise<LogicRes<string[]>> => {
  try {
    const treeData = await fetchGitTree(getRepoInfoFromCategory(category));

    // TODO: Combine these loops into one
    const files = treeData.data.tree.filter(d => {
      if (d.type !== 'blob') {
        return false;
      }
      if (d.path === 'README.md') {
        return false;
      }
      return true;
    });
    const slugs = files.map(f => {
      return path.parse(path.basename(f.path)).name;
    });

    return [undefined, slugs];
  } catch (e: unknown) {
    return [new LogicError('fetchBlogPosts failed', e), undefined];
  }
};
