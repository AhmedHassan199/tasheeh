import { useEffect } from 'react';

// Hook that hijacks the browser back button while a modal is open.
// On open we push a sentinel state onto history; on a popstate, we close
// the modal. On unmount or external close, we go back ourselves so the
// stack stays clean and the user doesn't need to press Back twice.
export function useModalHistory(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return undefined;

    const sentinel = { tasheehModalAt: Date.now() };
    history.pushState(sentinel, '', location.href);

    const onPop = () => onClose?.();
    window.addEventListener('popstate', onPop);

    return () => {
      window.removeEventListener('popstate', onPop);
      // If the modal was closed by code (not the back button), pop the
      // sentinel we pushed so the history doesn't grow unbounded.
      if (history.state?.tasheehModalAt === sentinel.tasheehModalAt) {
        history.back();
      }
    };
  }, [isOpen, onClose]);
}
