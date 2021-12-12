import styles from './HorizontalSushiAnimation.module.css';

export const HorizontalSushiAnimation: React.FC = ({ children }) => {
  return <div className={styles.animation}>{children}</div>;
};
