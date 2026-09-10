// tests/useOverflow.test.tsx

import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, it, expect } from "vitest";
import { useOverflow } from "../src/useOverflow";

afterEach(() => {
  cleanup();
});

function TestComponent({ elementRef }: { elementRef: React.RefObject<HTMLDivElement | null> }) {
  const { isOverflowing } = useOverflow(elementRef);

  return <div data-testid="status">{String(isOverflowing)}</div>;
}

describe("useOverflow", () => {
  it("returns false when there is no overflow", () => {
    const ref = { current: document.createElement("div") } as React.RefObject<HTMLDivElement>;

    Object.defineProperties(ref.current, {
      scrollWidth: { value: 100, configurable: true },
      clientWidth: { value: 100, configurable: true },
      scrollHeight: { value: 80, configurable: true },
      clientHeight: { value: 80, configurable: true },
    });

    render(<TestComponent elementRef={ref} />);

    expect(screen.getByTestId("status").textContent).toBe("false");
  });

  it("returns true for horizontal overflow", () => {
    const ref = { current: document.createElement("div") } as React.RefObject<HTMLDivElement>;

    Object.defineProperties(ref.current, {
      scrollWidth: { value: 200, configurable: true },
      clientWidth: { value: 100, configurable: true },
      scrollHeight: { value: 80, configurable: true },
      clientHeight: { value: 80, configurable: true },
    });

    render(<TestComponent elementRef={ref} />);

    expect(screen.getByTestId("status").textContent).toBe("true");
  });

  it("returns true for vertical overflow", () => {
    const ref = { current: document.createElement("div") } as React.RefObject<HTMLDivElement>;

    Object.defineProperties(ref.current, {
      scrollWidth: { value: 100, configurable: true },
      clientWidth: { value: 100, configurable: true },
      scrollHeight: { value: 200, configurable: true },
      clientHeight: { value: 80, configurable: true },
    });

    render(<TestComponent elementRef={ref} />);

    expect(screen.getByTestId("status").textContent).toBe("true");
  });

  it("returns true when both directions overflow", () => {
    const ref = { current: document.createElement("div") } as React.RefObject<HTMLDivElement>;

    Object.defineProperties(ref.current, {
      scrollWidth: { value: 200, configurable: true },
      clientWidth: { value: 100, configurable: true },
      scrollHeight: { value: 200, configurable: true },
      clientHeight: { value: 80, configurable: true },
    });

    render(<TestComponent elementRef={ref} />);

    expect(screen.getByTestId("status").textContent).toBe("true");
  });

  it("handles a ref that does not yet have a DOM element", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>;

    render(<TestComponent elementRef={ref} />);

    expect(screen.getByTestId("status").textContent).toBe("false");
  });
});
