import Link from 'next/link';
import { WrapGridUl } from '~/components/atoms/layouts/WrapGrid';
import type { BlogPostInfo } from '~/logics/entity/blogs';
import { BoxBlogPost } from './BoxBlogPost';
import styles from './index.module.css';

type Props = {
  items: (BlogPostInfo & { href: string })[];
};

export const BlogPostList: React.VFC<Props> = ({ items }) => {
  return (
    <WrapGridUl itemMaxWidth='28rem' rowGap='1.4rem' columnGap='1.4rem'>
      {items.map(post => {
        return (
          <li key={post.href} className={styles.box}>
            <Link href={post.href}>
              <a>
                <BoxBlogPost info={post} />
              </a>
            </Link>
          </li>
        );
      })}
    </WrapGridUl>
  );
};
