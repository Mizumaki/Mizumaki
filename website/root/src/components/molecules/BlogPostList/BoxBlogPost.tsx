import type { BlogPostInfo } from '~/logics/entity/blogs';
import styles from './BoxBlogPost.module.css';

type Props = {
  info: BlogPostInfo;
};

export const BoxBlogPost: React.VFC<Props> = ({ info }) => {
  return (
    <div className={styles.container}>
      <time dateTime={info.date}>{info.date}</time>
      <div className={styles.spacer1} />
      <p className={styles.title}>{info.title}</p>
      <div className={styles.spacer2} />
    </div>
  );
};
