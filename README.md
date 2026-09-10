# react-overflow-observer

A lightweight React hook that reports whether a DOM element is overflowing its visible container, including the overflowing direction.

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
  const { isOverflowing, horizontal, vertical } = useOverflow(ref);

  return (
    <div ref={ref}>
      {isOverflowing ? "Overflowing" : "Within bounds"}
      {horizontal && " Horizontally"}
      {vertical && " Vertically"}
    </div>
  );
}
```

## Behavior

The V2 implementation checks the element's measured size against its visible box:

- horizontal overflow: `scrollWidth > clientWidth`
- vertical overflow: `scrollHeight > clientHeight`
- `isOverflowing` is `true` when either condition is true
- `horizontal` reports horizontal overflow
- `vertical` reports vertical overflow

The hook performs its initial measurement after the component mounts. It does not yet include automatic ResizeObserver updates, scroll-position tracking, or other future features.
