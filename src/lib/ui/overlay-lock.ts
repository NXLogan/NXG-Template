type Listener = () => void;

let lockCount = 0;
const listeners = new Set<Listener>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function lockOverlay() {
  lockCount += 1;
  emit();
  return () => {
    lockCount = Math.max(0, lockCount - 1);
    emit();
  };
}

export function subscribeOverlayLock(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getOverlayLocked() {
  return lockCount > 0;
}
