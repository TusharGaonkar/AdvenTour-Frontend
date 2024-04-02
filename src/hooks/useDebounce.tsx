/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-this-alias */

// Custom implementation of debounce hook based on use cases of Adventour for search query
import { useEffect, useRef } from 'react';

function useDebounce<T extends (...args: any[]) => any>(callbackFn: T, delay: number) {
  const timerIDRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    return () => {
      clearTimeout(timerIDRef.current);
      timerIDRef.current = undefined;
    };
  }, []);

  // eslint-disable-next-line func-names
  return function (...args: Parameters<T>) {
    const context = this;
    if (timerIDRef.current) clearTimeout(timerIDRef.current);
    timerIDRef.current = setTimeout(() => {
      callbackFn.apply(context, args); // keep the context of this
    }, delay);
  };
}

export default useDebounce;
