import { useState, useCallback } from 'react';

type DomElementRefCallback = (node: HTMLElement | null) => void;

export const useDOMNode = (): [HTMLElement | undefined, DomElementRefCallback] => {
  const [domNode, setDomNode] = useState<HTMLElement>();

  const refCallback: DomElementRefCallback = useCallback(node => {
    if (node !== null) {
      setDomNode(node);
    }
  }, []);

  return [domNode, refCallback];
};
