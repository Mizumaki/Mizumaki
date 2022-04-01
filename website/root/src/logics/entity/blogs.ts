import { isObject, isString } from '~/utils/typeAssertion';

// TODO: Open other categories
const categories = [/*'dev', 'liquor', 'foodie', 'movie', 'investment', */ 'daily'] as const;

export type BlogCategory = typeof categories[number];

export const isValidBlogCategory = (arg: string): arg is BlogCategory => {
  return categories.includes(arg as BlogCategory);
};

export type BlogPostInfo = {
  title: string;
  date: string;
  // TODO: Implement tags correctly
  tags?: Array<string>;
};

export const isValidBlogPostInfo = (arg: unknown): arg is BlogPostInfo => {
  if (!isObject(arg)) {
    return false;
  }
  if (!isString(arg['title'])) {
    return false;
  }
  if (!isString(arg['date'])) {
    return false;
  }
  return true;
};
