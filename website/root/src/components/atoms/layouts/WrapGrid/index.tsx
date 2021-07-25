import { CSSProperties } from 'react';

type Props = {
  itemMaxWidth: string;
  rowGap: CSSProperties['rowGap'];
  justifyContent: CSSProperties['justifyContent'];
};

export const WrapGrid: React.FC<Props> = ({ itemMaxWidth, rowGap, justifyContent, children }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fill, min(${itemMaxWidth}, 100%))`,
        rowGap,
        justifyContent,
      }}>
      {children}
    </div>
  );
};
