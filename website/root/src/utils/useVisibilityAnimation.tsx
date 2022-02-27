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
  render: () => void
] => {
  const [isVisible, setIsVisible] = useState(options.initialVisibility);
  const [isInternallyVisible, setIsInternallyVisible] = useState(options.initialVisibility);

  useEffect(() => {
    if (isVisible) {
      setIsInternallyVisible(true);
      return;
    } else {
      const timeout = setTimeout(() => {
        setIsInternallyVisible(isVisible);
      }, options.animationDuration);
      return () => clearTimeout(timeout);
    }
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
    return isInternallyVisible ? (
      <div
        style={{
          transitionProperty: 'opacity visibility',
          transitionDuration: `${options.animationDuration}ms`,
          opacity: isVisible ? '1' : '0',
          visibility: isVisible ? 'visible' : 'hidden',
          animation: `${options.animationDuration}ms ease-out visibilityAnimation`,
        }}>
        <style>{animStyle}</style>
        {children}
      </div>
    ) : null;
  }, [isVisible, isInternallyVisible, options.animationDuration, children]);

  return [isVisible, status, setIsVisible, render];
};
