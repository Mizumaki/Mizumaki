import { CSSProperties } from 'react';

type Props = {
  itemMaxWidth: string;
  rowGap: CSSProperties['rowGap'];
} & (
  | {
      justifyContent: CSSProperties['justifyContent'];
      columnGap?: undefined;
    }
  | {
      justifyContent?: undefined;
      columnGap: CSSProperties['columnGap'];
    }
);

export const WrapGrid: React.FC<Props> = ({ itemMaxWidth, rowGap, justifyContent, columnGap, children }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, min(${itemMaxWidth}, 100%))`,
        rowGap,
        columnGap,
        justifyContent,
      }}>
      {children}
    </div>
  );
};

export const WrapGridUl: React.FC<Props> = ({ itemMaxWidth, rowGap, justifyContent, columnGap, children }) => {
  return (
    <ul
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, min(${itemMaxWidth}, 100%))`,
        rowGap,
        columnGap,
        justifyContent,
      }}>
      {children}
    </ul>
  );
};
