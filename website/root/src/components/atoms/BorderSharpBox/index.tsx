import cx from 'classnames';
import styles from './BorderSharpBox.module.css';

export const BorderSharpBox: React.FC = ({ children }) => {
  return (
    <div className={styles.box}>
      <div className={cx(styles.border, styles.top)} />
      <div className={styles.contents}>
        <div className={cx(styles.border, styles.left)} />
        {children}
        <div className={cx(styles.border, styles.right)} />
      </div>
      <div className={cx(styles.border, styles.bottom)} />
    </div>
  );
};
