import { flushSync } from 'react-dom';

export function supportsViewTransitions() {
  return typeof document !== 'undefined' && typeof document.startViewTransition === 'function';
}

export function withViewTransition(update: () => void, animate: boolean) {
  if (!animate || !supportsViewTransitions()) {
    update();
    return null;
  }
  return document.startViewTransition(() => {
    flushSync(update);
  });
}
