import { useCallback, useRef } from 'react';

type RunOnlyChangedFunc = <T>(arg1: T, arg2: (arg: T) => void) => void;

/**
 * Save last time value and run only if the argument is changed.
 * Please be aware that a deep value comparing is not supported.
 */
export const useOnlyChanged = () => {
  const prevValue = useRef<unknown>();
  const runOnlyChanged = useCallback<RunOnlyChangedFunc>((v, onChange) => {
    if (v !== prevValue.current) {
      onChange(v);
      prevValue.current = v;
    }
  }, []);

  return runOnlyChanged;
};
