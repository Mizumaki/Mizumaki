import { Dispatch, ReactNode, SetStateAction, useCallback, useEffect, useMemo, useState } from 'react';

type VisibilityStatus =
  | { isClosing: true; isOpening: false }
  | { isClosing: false; isOpening: true }
  | { isClosing: false; isOpening: false };

export const useVisibilityAnimation = (
  children: ReactNode,
  options: {
    initialVisibility: boolean;
    /**
     * ms
     */
    animationDuration: number;
  }
): [
  isVisible: boolean,
  status: VisibilityStatus,
  setVisibility: Dispatch<SetStateAction<boolean>>,
  render: () => ReactNode
] => {
  const [isVisible, setIsVisible] = useState(options.initialVisibility);
  const [isInternallyVisible, setIsInternallyVisible] = useState(options.initialVisibility);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsInternallyVisible(isVisible);
    }, options.animationDuration);
    return () => clearTimeout(timeout);
  }, [isVisible]);

  const status = useMemo<VisibilityStatus>(() => {
    if (isVisible === isInternallyVisible) {
      return {
        isOpening: false,
        isClosing: false,
      };
    }
    if (isVisible) {
      return {
        isOpening: true,
        isClosing: false,
      };
    }
    return {
      isOpening: false,
      isClosing: true,
    };
  }, [isVisible, isInternallyVisible]);

  const animStyle = `
  @keyframes visibilityAnimation {
    0% {
      opacity: 0;
      visibility: hidden;
    }
    100% {
      opacity: 1;
      visibility: visible;
    }
  }
  `;

  const render = useCallback(() => {
    if (status.isOpening) {
      return (
        <div
          style={{
            transitionProperty: 'opacity visibility',
            transitionDuration: `${options.animationDuration}ms`,
            opacity: '1',
            visibility: 'visible',
            animation: `${options.animationDuration}ms ease-out visibilityAnimation`,
          }}>
          <style>{animStyle}</style>
          {children}
        </div>
      );
    }

    return isInternallyVisible ? (
      <div
        style={{
          transitionProperty: 'opacity visibility',
          transitionDuration: `${options.animationDuration}ms`,
          opacity: isVisible ? '1' : '0',
          visibility: isVisible ? 'visible' : 'hidden',
        }}>
        <style>{animStyle}</style>
        {children}
      </div>
    ) : null;
  }, [isVisible, isInternallyVisible, status, options.animationDuration, children]);

  return [isVisible, status, setIsVisible, render];
};
