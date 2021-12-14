import styles from './BorderBoxWithTitle.module.css';

type Props = {
  title: React.ReactNode;
  border: React.CSSProperties['border'];
  titleMarginBottom?: React.CSSProperties['marginBottom'];
};

export const BorderBoxWithTitle: React.FC<Props> = ({ title, border, titleMarginBottom, children }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.titleSection}>
        <div className={styles.borderTop} style={{ borderBottom: border }} />
        <div style={{ marginBottom: titleMarginBottom }}>{title}</div>
        <div className={styles.borderTop} style={{ borderBottom: border }} />
      </div>
      <div
        style={{
          borderRight: border,
          borderLeft: border,
          borderBottom: border,
        }}>
        {children}
      </div>
    </div>
  );
};
