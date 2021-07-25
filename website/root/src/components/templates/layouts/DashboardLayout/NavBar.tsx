import styles from './NavBar.module.css';

export const NavBar: React.VFC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.serviceNameSection}>
        <h1 className={styles.serviceName}>Ryota Mizumaki</h1>
      </div>
    </div>
  );
};
