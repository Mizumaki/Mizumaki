import cx from 'classnames';
import { CSSProperties, useMemo } from 'react';
import { getUid } from '~/utils/uid';
import styles from './VerticalLayout.module.css';

type Props = {
  gap: string;
  firstChildMarginBottom?: CSSProperties['marginBottom'];
  lastChildMarginTop?: CSSProperties['marginTop'];
} & (
  | {
      height?: undefined;
    }
  | {
      height: CSSProperties['height'];
      align?: 'top' | 'center' | 'bottom';
    }
);

/**
 * 子要素が縦に連なる場合で、子要素同士の gap が同じとなるようなレイアウトを調整するコンポーネント
 * height の指定がある場合は、その高さに合わせて子要素の alignment も調整可能
 * Tips: `height` を指定しつつ `firstChildMarginBottom` や `lastChildMarginTop` に `auto` を指定することで、余った余白を最初や最後の子要素の gap として配分することができる
 */
export const VerticalLayout: React.FC<Props> = props => {
  const { gap, firstChildMarginBottom, lastChildMarginTop, children } = props;
  // TODO: Use CSS in JS and remove uid
  const uid = useMemo(() => getUid(), []);

  const styleText = useMemo(() => {
    const rootClass = `.${styles.verticalLayout || ''}.${uid}`;
    const styleRules = new Map<string, string>([
      [rootClass, `justify-content: ${props.height && props.align === 'center' ? 'center' : 'flex-start'};`],
      [`${rootClass} > *`, `flex: none; min-height: fit-content;`],
      [`${rootClass} > * + *`, `margin-top: ${gap};`],
    ]);

    const addStyleRule = (key: string, value: string) => {
      styleRules.set(key, `${styleRules.get(key) || ''}${value}`);
    };

    if (firstChildMarginBottom) {
      addStyleRule(`${rootClass} > :first-child + *`, `margin-top: ${firstChildMarginBottom};`);
    }
    if (lastChildMarginTop) {
      addStyleRule(`${rootClass} > :last-child`, `margin-top: ${lastChildMarginTop};`);
    }

    if (props.height) {
      addStyleRule(rootClass, `height: ${props.height};`);

      if (props.align && props.align === 'bottom') {
        addStyleRule(`${rootClass} > :first-child`, `margin-top: auto;`);
      }
    }

    return Array.from(styleRules.entries())
      .map(([selector, values]) => {
        return `
        ${selector} {
          ${values}
        }
      `;
      })
      .join('');
  }, [uid, gap, firstChildMarginBottom, lastChildMarginTop]);

  return (
    <>
      <style>{styleText}</style>
      <div className={cx(styles.verticalLayout, uid)}>{children}</div>
    </>
  );
};
