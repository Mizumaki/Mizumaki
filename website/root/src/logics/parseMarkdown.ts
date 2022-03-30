import { marked } from 'marked';
import { BlogPostInfo } from './entity/blogs';

type MarkdownParseResult = {
  html: string;
  info?: BlogPostInfo;
};

// TODO: Buffer の状態で受け取り、変換する段階で BlogPostInfo を抜き出していった方が効率は良さそう
export const parseMarkdown = (mdText: string): MarkdownParseResult => {
  const { text, info } = extractBlogPostInfo(mdText);
  const html = marked(text);

  return {
    html,
    info,
  };
};

// TODO: Write test
const extractBlogPostInfo = (givenMDText: string): { text: string; info?: BlogPostInfo } => {
  const trimmedText = givenMDText.trim();
  if (trimmedText[0] !== '-' || trimmedText[1] !== '-' || trimmedText[2] !== '-') {
    return { text: givenMDText };
  }
  const [infoText, mdText] = trimmedText.substring(3).split(/---/s);
  const info: BlogPostInfo = {};

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

  return {
    text: mdText ?? '',
    info,
  };
};
