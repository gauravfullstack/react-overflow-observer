// src/useOverflow.ts
import { useState, useEffect, type RefObject } from "react";

export function useOverflow<T extends HTMLElement>(
  ref: RefObject<T | null>
): { isOverflowing: boolean; horizontal: boolean; vertical: boolean } {
  const [overflow, setOverflow] = useState({
    isOverflowing: false,
    horizontal: false,
    vertical: false,
  });

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      setOverflow({ isOverflowing: false, horizontal: false, vertical: false });
      return;
    }

    const horizontal = element.scrollWidth > element.clientWidth;
    const vertical = element.scrollHeight > element.clientHeight;

    setOverflow({
      isOverflowing: horizontal || vertical,
      horizontal,
      vertical,
    });
  }, [ref]);

  return overflow;
}
