import { CSSProperties, useMemo } from 'react';
import styles from './DashboardLayout.module.css';
import { NavBar } from './NavBar';

type Props = {
  backgroundColor: Exclude<CSSProperties['backgroundColor'], undefined>;
  color: Exclude<CSSProperties['color'], undefined>;
};

export const DashboardLayout: React.FC<Props> = ({ backgroundColor, color, children }) => {
  const styleText = useMemo(() => {
    return `
      body {
        color: ${color};
        background-color: ${backgroundColor};
      }
    `;
  }, [backgroundColor]);
  return (
    <div className={styles.wrapper}>
      <style>{styleText}</style>
      <nav>
        <NavBar />
      </nav>
      <main>{children}</main>
    </div>
  );
};
