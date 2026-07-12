import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/brand/Logo";
import { useI18n } from "@/lib/i18n/context";
import { useSiteAudio } from "@/lib/audio/site-audio";
import { DISCORD_URL } from "@/lib/config/social";

export function Footer() {
  const { enabled: audio, toggle: toggleAudio, ready } = useSiteAudio();
  const { t, ti } = useI18n();

  return (
    <footer className="border-t border-border bg-background/80 text-foreground relative">
      <div className="absolute inset-x-0 top-0 shimmer-line" />
      <div className="page-gutter-x py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-10">
        <div className="col-span-1 sm:col-span-2">
          <Logo size={44} />
          <p className="display text-3xl sm:text-4xl md:text-5xl mt-6 max-w-lg text-balance">
            {t.footer.tagline}
          </p>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <Link to="/" className="story-link w-fit">{t.footer.home}</Link>
            <Link to="/products" className="story-link w-fit">{t.footer.products}</Link>
            <Link to="/faq" className="story-link w-fit">{t.footer.faq}</Link>
            <Link to="/doc" className="story-link w-fit">{t.footer.doc}</Link>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-2">
            <a className="story-link w-fit" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              {t.footer.instagram}
            </a>
            <a className="story-link w-fit" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              {t.footer.discord}
            </a>
            <a className="story-link w-fit" href={DISCORD_URL} target="_blank" rel="noopener noreferrer">
              {t.footer.twitter}
            </a>
            <Link to="/contact" className="story-link w-fit">{t.footer.contact}</Link>
          </div>
        </div>
      </div>

      <div className="page-gutter-x py-4 border-t border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <button
          onClick={toggleAudio}
          className="group flex flex-wrap items-center gap-2 sm:gap-3 mono-label text-foreground min-h-[var(--touch-min)]"
          aria-pressed={audio}
          aria-label={audio ? t.footer.audioOn : t.footer.audioOff}
          data-clickable
        >
          <span className="relative inline-flex items-center h-4 w-8 border border-foreground/30">
            <span
              className={`absolute top-0 bottom-0 w-3 transition-all duration-300 ${
                audio ? "left-[calc(100%-0.75rem)]" : "left-0"
              } ${audio && ready ? "site-audio-pulse" : ""}`}
              style={{ background: "linear-gradient(180deg, oklch(0.94 0.028 88), oklch(0.58 0.21 28 / 0.85))" }}
            />
          </span>
          <span>{audio ? t.footer.audioOn : t.footer.audioOff}</span>
          <span className="text-foreground/40">·</span>
          <span className="text-foreground/40">{t.footer.experimental}</span>
        </button>
        <div className="mono-label text-foreground/40 hidden md:flex items-center gap-3">
          <span
            className={`inline-block h-2 w-2 rounded-full ${audio && ready ? "site-audio-signal" : "animate-pulse"}`}
            style={{
              background: audio && ready ? "oklch(0.58 0.21 28 / 0.85)" : "oklch(0.74 0.038 84)",
              boxShadow:
                audio && ready
                  ? "0 0 10px oklch(0.58 0.21 28 / 0.55)"
                  : "0 0 8px oklch(0.74 0.038 84 / 0.6)",
            }}
          />
          {audio && ready ? t.footer.audioPlaying : t.footer.signalActive}
        </div>
      </div>

      <div className="page-gutter-x py-5 md:py-6 border-t border-border flex flex-col md:flex-row justify-between mono-label text-foreground/40 gap-2">
        <span>{ti(t.footer.copyright)}</span>
        <span>{t.footer.motto}</span>
      </div>
    </footer>
  );
}
