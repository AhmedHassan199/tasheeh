import { useEffect, useRef } from 'react';

// Hook that hijacks the browser back button while a modal is open.
// On open we push a sentinel state onto history; on a popstate, we close
// the modal. On unmount or external close, we go back ourselves so the
// stack stays clean and the user doesn't need to press Back twice.
//
// IMPORTANT: the callback is held in a ref so that the effect only re-runs
// when `isOpen` actually toggles. If we depended on `onClose` directly, an
// inline lambda from the parent (recreated each render) would cause an
// endless cycle of cleanup → history.back() → popstate → parent re-render,
// which closes the modal on every state change inside it.
export function useModalHistory(isOpen, onClose) {
  const cbRef = useRef(onClose);
  useEffect(() => {
    cbRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const sentinel = { tasheehModalAt: Date.now() };
    history.pushState(sentinel, '', location.href);

    const onPop = () => cbRef.current?.();
    window.addEventListener('popstate', onPop);

    return () => {
      window.removeEventListener('popstate', onPop);
      // If the modal was closed by code (not the back button), pop the
      // sentinel we pushed so the history doesn't grow unbounded.
      if (history.state?.tasheehModalAt === sentinel.tasheehModalAt) {
        history.back();
      }
    };
  }, [isOpen]);
}
