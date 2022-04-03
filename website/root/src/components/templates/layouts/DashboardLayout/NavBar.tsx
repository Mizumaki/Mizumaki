import Link from 'next/link';
import styles from './NavBar.module.css';
import { Hover } from '~/components/atoms/Hover';
import { BorderBoxWithTitle } from '~/components/atoms/BorderBoxWithTitle';
import { ReactNode } from 'react';

export const NavBar: React.VFC = () => {
  return (
    <div className={styles.wrapper}>
      <section className={styles.serviceNameSection}>
        <h1 className={styles.serviceName}>
          <Link href='/'>
            <a className={styles.a}>Ryota Mizumaki</a>
          </Link>
        </h1>
      </section>
      <section className={styles.logsSection}>
        <BorderBoxWithTitle
          border='1px solid'
          title={<h2 className={styles.heading}>趣味 log</h2>}
          titleMarginBottom='-0.5em'>
          <ul className={styles.links}>
            <li>
              <LinkItem
                disabled
                href='/logs/dev'
                hoverOn={<span style={{ fontStyle: 'italic', color: 'var(--c-text-blue)' }}>プログラミング</span>}
                hoverOff={'Programming'}
              />
            </li>
            <li>
              <LinkItem
                disabled
                href='/logs/liquor'
                hoverOn={<span style={{ fontStyle: 'italic', color: 'var(--c-text-yellow)' }}>リカー</span>}
                hoverOff={'Liquor'}
              />
            </li>
            <li>
              <LinkItem
                disabled
                href='/logs/foodie'
                hoverOn={<span style={{ fontStyle: 'italic', color: 'var(--c-text-yellow)' }}>メシ</span>}
                hoverOff={'Restaurant'}
              />
            </li>
            <li>
              <LinkItem
                disabled
                href='/logs/movie'
                hoverOn={<span style={{ fontStyle: 'italic' }}>ムービー</span>}
                hoverOff={'Movie'}
              />
            </li>
            <li>
              <LinkItem
                disabled
                href='/logs/investment'
                hoverOn={<span style={{ fontStyle: 'italic', color: 'var(--c-text-cyan)' }}>マネー</span>}
                hoverOff={'Investment'}
              />
            </li>
            <li>
              <LinkItem
                href='/logs/daily'
                hoverOn={<span style={{ fontStyle: 'italic', color: 'var(--c-text-cyan)' }}>そのほか</span>}
                hoverOff={'Daily'}
              />
            </li>
          </ul>
        </BorderBoxWithTitle>
      </section>
    </div>
  );
};

const LinkItem: React.VFC<{
  href: string;
  hoverOn: ReactNode;
  hoverOff: ReactNode;
  disabled?: boolean;
}> = ({ href, hoverOn, hoverOff, disabled }) => {
  if (disabled) {
    return (
      <button disabled className={styles.disabledButton}>
        {hoverOff}
      </button>
    );
  }

  return (
    <Link href={href}>
      <a>
        <Hover on={hoverOn} off={hoverOff} />
      </a>
    </Link>
  );
};
