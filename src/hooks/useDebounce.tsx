// Custom implementation of debounce hook based on use cases of Adventour for search query

import { useEffect, useRef } from 'react';

const useDebounce = <T extends (...args: any[]) => any>(callbackFn: T, delay: number) => {
  const timerIDRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // eslint-disable-next-line arrow-body-style
  useEffect(() => {
    return () => {
      clearTimeout(timerIDRef.current);
      timerIDRef.current = undefined;
    };
  }, []);

  return (...args: Parameters<T>) => {
    if (timerIDRef.current) clearTimeout(timerIDRef.current);
    timerIDRef.current = setTimeout(() => {
      callbackFn.apply(this, args); // keep the context of this
    }, delay);
  };
};

export default useDebounce;
