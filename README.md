# react-overflow-observer

A lightweight React hook that reports whether a DOM element is overflowing its visible container.

## Installation

```bash
npm install react-overflow-observer
```

## Usage

```tsx
import { useRef } from "react";
import { useOverflow } from "react-overflow-observer";

function Example() {
  const ref = useRef<HTMLDivElement>(null);
  const { isOverflowing } = useOverflow(ref);

  return <div ref={ref}>{isOverflowing ? "Overflowing" : "Within bounds"}</div>;
}
```

## Behavior

The V1 implementation checks the element's measured size against its visible box:

- horizontal overflow: `scrollWidth > clientWidth`
- vertical overflow: `scrollHeight > clientHeight`
- `isOverflowing` is `true` when either condition is true

This is the initial version. It performs a single measurement and does not yet include automatic ResizeObserver updates, scroll-position tracking, or other future features.
