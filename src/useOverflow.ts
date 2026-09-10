// src/useOverflow.ts
import { useState, useEffect, type RefObject } from "react";

export function useOverflow<T extends HTMLElement>(
  ref: RefObject<T | null>
): { isOverflowing: boolean } {
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      setIsOverflowing(false);
      return;
    }

    const nextValue =
      element.scrollWidth > element.clientWidth ||
      element.scrollHeight > element.clientHeight;

    setIsOverflowing(nextValue);
  }, [ref]);

  return { isOverflowing };
}
