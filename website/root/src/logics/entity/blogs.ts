// TODO: Open other categories
const categories = [/*'dev', 'liquor', 'foodie', 'movie', 'investment', */ 'daily'] as const;

export type BlogCategory = typeof categories[number];

export const isValidBlogCategory = (arg: string): arg is BlogCategory => {
  return categories.includes(arg as BlogCategory);
};

export type BlogPostInfo = {
  title?: string;
  date?: string;
  // TODO: Implement tags correctly
  tags?: Array<string>;
};
