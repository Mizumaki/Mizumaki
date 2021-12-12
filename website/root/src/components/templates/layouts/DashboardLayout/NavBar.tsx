import styles from './NavBar.module.css';
import Link from 'next/link';
import { Hover } from '~/components/atoms/Hover';

export const NavBar: React.VFC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.serviceNameSection}>
        <h1 className={styles.serviceName}>Ryota Mizumaki</h1>
      </div>
      <ul className={styles.links}>
        <li>
          <Link href='/'>
            <a>
              <Hover on={<span style={{ fontStyle: 'italic' }}>プログラミング</span>} off={'Programming'} />
            </a>
          </Link>
        </li>
        <li>
          <Link href='/'>
            <a>
              <Hover on={<span style={{ fontStyle: 'italic' }}>さけ</span>} off={'Liquor'} />
            </a>
          </Link>
        </li>
        <li>
          <Link href='/'>
            <a>
              <Hover on={<span style={{ fontStyle: 'italic' }}>えいが</span>} off={'Movie'} />
            </a>
          </Link>
        </li>
        <li>
          <Link href='/'>
            <a>
              <Hover on={<span style={{ fontStyle: 'italic' }}>かぶ</span>} off={'Stock Investment'} />
            </a>
          </Link>
        </li>
      </ul>
    </div>
  );
};
