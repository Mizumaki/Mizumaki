import { BorderSharpBox } from '~/components/atoms/BorderSharpBox';
import { HorizontalSushiAnimation } from '~/components/atoms/HorizontalSushiAnimation';
import { useDOMNode } from '~/utils/useDOMNode';
import { useVisibilityAnimation } from '~/utils/useVisibilityAnimation';
import styles from './Introduction.module.css';

// TODO: やりたいこと：多言語対応、CLI like view、Design
export const Introduction = () => {
  const [selfIntroductionElm, selfIntroductionRefCallback] = useDOMNode();
  const [isSelfIntroductionShown, , setIsSelfIntroductionShown, renderSelfIntroduction] = useVisibilityAnimation(
    <div className={styles.sectionContents} ref={selfIntroductionRefCallback}>
      <div className={styles.sectionContentsInner}>
        <p>WEB Developer</p>
        <p>Mainly works as a FrontEnd engineer.</p>
        <p>Love JS (Jason Statham &amp; JavaScript).</p>
        <p>Of course, I love TypeScript too. (In fact, I like it more than JS lol) Also, I love React.</p>
        <div className={styles.subSectionTitle}>
          <BorderSharpBox>
            <h3>自信がある技術</h3>
          </BorderSharpBox>
        </div>
        <ul>
          <li>React</li>
          <li>TypeScript</li>
          <li>Node.js</li>
        </ul>
        <div className={styles.subSectionTitle}>
          <BorderSharpBox>
            <h3>好きな技術、興味関心</h3>
          </BorderSharpBox>
        </div>
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
        {/* TODO: Make it visible */}
        <div className={styles.subSectionTitle} style={{ display: 'none' }}>
          <BorderSharpBox>
            <h3>経歴</h3>
          </BorderSharpBox>
        </div>
        <div style={{ display: 'none' }}>
          <h4>職歴</h4>
          <h4>学歴</h4>
        </div>
      </div>
    </div>,
    {
      initialVisibility: false,
      animationDuration: 500,
    }
  );
  const [isHobbyShown, , setIsHobbyShown, renderHobby] = useVisibilityAnimation(
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
    </div>,
    {
      initialVisibility: false,
      animationDuration: 500,
    }
  );

  const translateYs = (() => {
    return {
      hobby: isSelfIntroductionShown
        ? selfIntroductionElm?.clientHeight
          ? `${selfIntroductionElm?.clientHeight}px`
          : '0'
        : '0',
    };
  })();

  return (
    <div className={styles.wrapper}>
      <h1>Hello World</h1>
      <section>
        <SectionTitle
          value='自己紹介'
          toggleButtonLabel={isSelfIntroductionShown ? '-' : '+'}
          onClickToggle={() => setIsSelfIntroductionShown(prev => !prev)}
        />
        {renderSelfIntroduction()}
      </section>
      <section
        style={{
          transition: 'transform 1s',
          transform: `translateY(${translateYs.hobby})`,
        }}>
        <SectionTitle
          value='趣味'
          toggleButtonLabel={isHobbyShown ? '-' : '+'}
          onClickToggle={() => setIsHobbyShown(prev => !prev)}
        />
        {renderHobby()}
      </section>
      {/* TODO: Make it visible */}
      <section style={{ visibility: 'hidden' }}>
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
