import { useState } from 'react';
import { BorderSharpBox } from '~/components/atoms/BorderSharpBox';
import { HorizontalSushiAnimation } from '~/components/atoms/HorizontalSushiAnimation';
import styles from './Introduction.module.css';

// やりたいこと：多言語対応、CLI like view、
export const Introduction = () => {
  const [isSelfIntroductionShown, setIsSelfIntroductionShown] = useState(true);
  const [isHobbyShown, setIsHobbyShown] = useState(false);

  return (
    <div className={styles.wrapper}>
      <h1>Hello World</h1>
      <section>
        <SectionTitle
          value='自己紹介'
          toggleButtonLabel={isSelfIntroductionShown ? '-' : '+'}
          onClickToggle={() => setIsSelfIntroductionShown(prev => !prev)}
        />
        {isSelfIntroductionShown && (
          <div className={styles.sectionContents}>
            <p>WEB Developer</p>
            <p>Mainly works as a FrontEnd engineer.</p>
            <p>Love JS (Jason Statham &amp; JavaScript).</p>
            <p>Of course, I love TypeScript too. (In fact, I like it more than JS lol) Also, I love React.</p>
            <BorderSharpBox>
              <h3>自信がある技術</h3>
            </BorderSharpBox>
            <ul>
              <li>React</li>
              <li>TypeScript</li>
              <li>Node.js</li>
            </ul>
            <BorderSharpBox>
              <h3>好きな技術、興味関心</h3>
            </BorderSharpBox>
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
            <BorderSharpBox>
              <h3>経歴</h3>
            </BorderSharpBox>
            <div>
              <h4>職歴</h4>
              <h4>学歴</h4>
            </div>
          </div>
        )}
      </section>
      <section>
        <SectionTitle
          value='趣味'
          toggleButtonLabel={isHobbyShown ? '-' : '+'}
          onClickToggle={() => setIsHobbyShown(prev => !prev)}
        />
        {isHobbyShown && (
          <div className={styles.sectionContents}>
            <ul>
              <li>開発</li>
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
        )}
      </section>
      <section>
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
        </table>
      </section>
    </div>
  );
};

const SectionTitle: React.VFC<{ value: string; toggleButtonLabel: '+' | '-'; onClickToggle: () => void }> = ({
  value,
  toggleButtonLabel,
  onClickToggle,
}) => {
  return (
    <button className={styles.sectionTitle} onClick={onClickToggle}>
      <span className={styles.sectionToggleButton}>{toggleButtonLabel}</span>
      <h2 className={styles.title}>{value}</h2>
    </button>
  );
};
