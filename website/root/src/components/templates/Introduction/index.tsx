import styles from './Introduction.module.css';

export const Introduction = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <span className={styles.icon}>🥃</span>
      <span className={styles.icon}>🍺</span>
      <span className={styles.icon}>🍷</span>
      <span className={styles.icon}>🍸</span>
    </div>
  );
};
