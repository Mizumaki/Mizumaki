import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import type { BlogCategory } from '~/logics/entity/blogs';

// TODO: This shouldn't be here. (should be handled in config)
export const getRepoInfoFromCategory = (category: BlogCategory): { org: string; repo: string } => {
  switch (category) {
    case 'daily':
      return {
        org: 'Mizumaki',
        repo: 'logs_daily',
      };
    // TODO: Implement correctly
    case 'dev':
      return {
        org: 'Mizumaki',
        repo: 'logs_daily',
      };
    case 'foodie':
      return {
        org: 'Mizumaki',
        repo: 'logs_daily',
      };
    case 'investment':
      return {
        org: 'Mizumaki',
        repo: 'logs_daily',
      };
    case 'liquor':
      return {
        org: 'Mizumaki',
        repo: 'logs_daily',
      };
    case 'movie':
      return {
        org: 'Mizumaki',
        repo: 'logs_daily',
      };
  }
};

const fetchGitHub = async <Res>(path: string, config?: AxiosRequestConfig): Promise<AxiosResponse<Res>> => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const conf = { ...config, headers: config?.headers ?? {} };
  // TODO: Remove process.env dependency
  conf.headers.Authorization = `token ${process.env.GITHUB_ACCESS_TOKEN ?? ''}`;
  return axios.get<Res>(`https://api.github.com${path}`, conf);
};

export const fetchGitTree = async (param: { org: string; repo: string }) => {
  const treeData = await fetchGitHub<{
    sha: string;
    url: string;
    tree: { path: string; type: 'tree' | 'blob'; sha: string }[];
  }>(`/repos/${param.org}/${param.repo}/git/trees/master`, {
    params: {
      recursive: 1,
    },
  });

  return treeData;
};

export const searchGitHub = async (query: { org: string; repo: string; filename?: string }) => {
  let q = `repo:${query.org}/${query.repo}`;
  if (query.filename) {
    q += ` filename:${query.filename}`;
  }
  return fetchGitHub<{
    total_count: number;
    incomplete_results: boolean;
    items: {
      name: string;
      path: string;
      sha: string;
    }[];
  }>('/search/code', {
    params: {
      q,
    },
  });
};

export const fetchGitBlob = async (param: { org: string; repo: string; sha: string }) => {
  return fetchGitHub<{
    // base64 encoding content
    content: string;
  }>(`/repos/${param.org}/${param.repo}/git/blobs/${param.sha}`);
};
