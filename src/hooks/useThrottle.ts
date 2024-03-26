import {useCallback, useRef} from "react";

export const useThrottle = (callback: Function, delay: number) => {
  const isWaiting = useRef(false);

  return useCallback(
    (...args: any) => {
      if (!isWaiting.current) {
        callback(...args);
        isWaiting.current = true;
        setTimeout(() => {
          isWaiting.current = false;
        }, delay);
      }
    },
    [callback, delay],
  );
};
