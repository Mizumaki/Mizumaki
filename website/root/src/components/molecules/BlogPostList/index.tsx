import Link from 'next/link';
import type { BlogPostInfo } from '~/logics/entity/blogs';
import styles from './index.module.css';

type Props = {
  items: (BlogPostInfo & { href: string })[];
};

export const BlogPostList: React.VFC<Props> = ({ items }) => {
  return (
    <ul>
      {items.map(post => {
        return (
          <li key={post.href} className={styles.box}>
            <Link href={post.href}>
              <a>
                {post.title}
                {post.date}
              </a>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
