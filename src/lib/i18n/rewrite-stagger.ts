const TEXT_SELECTOR =
  "h1,h2,h3,h4,h5,h6,p,a,button,label,li,dt,dd,figcaption,th,td,.display,.mono-label,.nav-brand-text,.ink-link,.lang-switch-code,.lang-switch-name,.lang-switch-mark";

export function getAnimatableTextElements(root: HTMLElement): HTMLElement[] {
  const candidates = Array.from(root.querySelectorAll<HTMLElement>(TEXT_SELECTOR));

  const withText = candidates.filter((el) => {
    if (el.closest("[data-lang-skip]")) return false;
    if (el.closest("svg")) return false;
    const text = el.textContent?.replace(/\s+/g, " ").trim();
    return Boolean(text);
  });

  return withText.filter(
    (el) => !withText.some((other) => other !== el && other.contains(el)),
  );
}

export function applyRewriteStagger(root: HTMLElement | null) {
  if (!root) return 0;

  root.querySelectorAll(".lang-rewrite-node").forEach((el) => {
    el.classList.remove("lang-rewrite-node");
    (el as HTMLElement).style.removeProperty("--rewrite-i");
  });

  const nodes = getAnimatableTextElements(root);
  nodes.forEach((el, i) => {
    el.classList.add("lang-rewrite-node");
    el.style.setProperty("--rewrite-i", String(i));
  });

  return nodes.length;
}

export function clearRewriteStagger(root: HTMLElement | null) {
  if (!root) return;
  root.querySelectorAll(".lang-rewrite-node").forEach((el) => {
    el.classList.remove("lang-rewrite-node");
    (el as HTMLElement).style.removeProperty("--rewrite-i");
  });
}
