import Link from 'next/link';
import styles from './NavBar.module.css';
import { Hover } from '~/components/atoms/Hover';
import { BorderBoxWithTitle } from '~/components/atoms/BorderBoxWithTitle';

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
              <Link href='/'>
                <a>
                  <Hover
                    on={<span style={{ fontStyle: 'italic', color: 'var(--c-text-blue)' }}>プログラミング</span>}
                    off={'Programming'}
                  />
                </a>
              </Link>
            </li>
            <li>
              <Link href='/liquor'>
                <a>
                  <Hover
                    on={<span style={{ fontStyle: 'italic', color: 'var(--c-text-yellow)' }}>リカー</span>}
                    off={'Liquor'}
                  />
                </a>
              </Link>
            </li>
            <li>
              <Link href='/liquor'>
                <a>
                  <Hover
                    on={<span style={{ fontStyle: 'italic', color: 'var(--c-text-yellow)' }}>メシ</span>}
                    off={'Restaurant'}
                  />
                </a>
              </Link>
            </li>
            <li>
              <Link href='/movie'>
                <a>
                  <Hover on={<span style={{ fontStyle: 'italic' }}>ムービー</span>} off={'Movie'} />
                </a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>
                  <Hover
                    on={<span style={{ fontStyle: 'italic', color: 'var(--c-text-cyan)' }}>マネー</span>}
                    off={'Investment'}
                  />
                </a>
              </Link>
            </li>
            <li>
              <Link href='/'>
                <a>
                  <Hover
                    on={<span style={{ fontStyle: 'italic', color: 'var(--c-text-cyan)' }}>そのほか</span>}
                    off={'Daily'}
                  />
                </a>
              </Link>
            </li>
          </ul>
        </BorderBoxWithTitle>
      </section>
    </div>
  );
};
