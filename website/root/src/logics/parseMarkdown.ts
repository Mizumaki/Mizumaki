import { marked } from 'marked';
import { BlogPostInfo, isValidBlogPostInfo } from './entity/blogs';
import { LogicError, LogicRes } from './type';

type MarkdownParseResult = {
  html: string;
  info: BlogPostInfo;
};

// TODO: Buffer の状態で受け取り、変換する段階で BlogPostInfo を抜き出していった方が効率は良さそう
export const parseMarkdown = (mdText: string): LogicRes<MarkdownParseResult> => {
  const [err, data] = extractBlogPostInfo(mdText);
  if (err) {
    return [err];
  }

  const html = marked(data.text);

  return [
    undefined,
    {
      html,
      info: data.info,
    },
  ];
};

// TODO: Write test
const extractBlogPostInfo = (givenMDText: string): LogicRes<{ text: string; info: BlogPostInfo }> => {
  const trimmedText = givenMDText.trim();
  if (trimmedText[0] !== '-' || trimmedText[1] !== '-' || trimmedText[2] !== '-') {
    const err = new LogicError('Missing BlogPostInfo');
    return [err];
  }
  const [infoText, mdText] = trimmedText.substring(3).split(/---/s);

  const info: Partial<BlogPostInfo> = {};
  // TODO: maybe it's better to parse as yaml (for tags)
  for (const infoLine of infoText?.trim().split('\n') ?? []) {
    const [k, v] = infoLine.split(/:/s);
    switch (k) {
      case 'title':
        info.title = v;
        break;
      case 'date':
        info.date = v;
        break;
      // TODO: Implement tags correctly
    }
  }
  if (!isValidBlogPostInfo(info)) {
    const err = new LogicError(`BlogPostInfo is missing some required info: ${JSON.stringify(info)}`);
    return [err];
  }

  return [
    undefined,
    {
      text: mdText ?? '',
      info,
    },
  ];
};
