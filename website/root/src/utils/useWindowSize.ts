import { useState, useEffect } from 'react';

// Execute only in client side because this hook relys on `window`
export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState<{
    width: string;
    height: string;
  }>({
    width: `${window.innerWidth}px`,
    height: `${window.innerHeight}px`,
  });

  useEffect(() => {
    const handleResize = () => {
      // alert(`resize: ${window.innerHeight} ${window.screen.height}`,)
      setWindowSize({
        width: `${window.innerWidth}px`,
        height: `${window.innerHeight}px`,
      });
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};
