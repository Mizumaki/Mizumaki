import { Fragment, ReactNode } from 'react';
import styles from './Hover.module.css';

type Props = {
  on: ReactNode;
  off: ReactNode;
};

// TODO: Afford animation
export const Hover: React.VFC<Props> = ({ on, off }) => {
  return (
    <Fragment>
      <span className={styles.on}>{on}</span>
      <span className={styles.off}>{off}</span>
    </Fragment>
  );
};
