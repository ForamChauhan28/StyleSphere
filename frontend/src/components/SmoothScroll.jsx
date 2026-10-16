import React from 'react';
import { ReactLenis } from 'lenis/react';

export default function SmoothScroll({ children }) {
  return (
    <ReactLenis 
      root 
      options={{
        lerp: 0.05,
        duration: 1.5,
        smoothWheel: true,
        smoothTouch: false,
        prevent: (node) => {
          if (!node || typeof node.closest !== 'function') return false;
          return Boolean(
            node.closest('[data-lenis-prevent]') ||
            node.closest('.overflow-y-auto') ||
            node.closest('.overflow-auto') ||
            node.closest('.overflow-y-scroll') ||
            node.closest('[role="dialog"]') ||
            node.closest('.fixed')
          );
        },
      }}
    >
      {children}
    </ReactLenis>
  );
}
