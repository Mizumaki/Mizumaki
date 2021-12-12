import { HorizontalSushiAnimation } from '~/components/atoms/HorizontalSushiAnimation';
import styles from './Introduction.module.css';

export const Introduction = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <p>WEB Developer</p>
      <div>
        <h2>ある程度の自信がある技術</h2>
        <ul>
          <li>React</li>
          <li>TypeScript</li>
          <li>Node.js</li>
        </ul>
        <h2>好きな技術、興味関心</h2>
        {/* ステータス、レベル感も軽く載せたい */}
        <ul>
          <li>Rust</li>
          <li>Docker</li>
          <li>Postgre SQL</li>
          <li>Figma</li>
          <li>静的型付け</li>
          <li>UI と Logic の分離</li>
          <li>Component 設計</li>
          <li>CSS 設計</li>
        </ul>
      </div>
      <div>
        <h2>趣味</h2>
        <ul>
          <li>酒</li>
          <li>映画</li>
          <li>株</li>
        </ul>
        <HorizontalSushiAnimation>
          {/* TODO: CSS の grid で repeat を使いつつ、background-image で icon を表示できないか？ */}
          <span className={styles.icon}>🥃</span>
          <span className={styles.icon}>🍺</span>
          <span className={styles.icon}>🍷</span>
          <span className={styles.icon}>🍸</span>
        </HorizontalSushiAnimation>
      </div>
      <div>
        <p>links</p>
        <table>
          <tbody>
            <tr>
              <td>GitHub</td>
              <td>
                <a href='https://github.com/Mizumaki'>https://github.com/Mizumaki</a>
              </td>
            </tr>
            <tr>
              <td>Qitta</td>
              <td>
                <a href='https://qiita.com/Statham'>https://qiita.com/Statham</a>
              </td>
            </tr>
            <tr>
              <td>Zenn</td>
              <td>
                <a href='https://zenn.dev/statham'>https://zenn.dev/statham</a>
              </td>
            </tr>
          </tbody>
          <tr></tr>
        </table>
      </div>
    </div>
  );
};
