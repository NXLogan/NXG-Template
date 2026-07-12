/// <reference path="./youtube.d.ts" />

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

const VIDEO_ID = "sF80I-TQiW0";
const STORAGE_KEY = "site-audio-enabled";

interface SiteAudioCtx {
  enabled: boolean;
  ready: boolean;
  toggle: () => void;
  setEnabled: (value: boolean) => void;
}

const Ctx = createContext<SiteAudioCtx | null>(null);

let ytApiPromise: Promise<void> | null = null;

function loadYouTubeAPI() {
  if (typeof window === "undefined") return Promise.resolve();
  if (window.YT?.Player) return Promise.resolve();

  if (!ytApiPromise) {
    ytApiPromise = new Promise((resolve) => {
      if (window.YT?.Player) {
        resolve();
        return;
      }

      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        prev?.();
        resolve();
      };

      if (!document.getElementById("youtube-iframe-api")) {
        const tag = document.createElement("script");
        tag.id = "youtube-iframe-api";
        tag.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(tag);
      }
    });
  }

  return ytApiPromise;
}

function SiteAudioPlayer({ enabled, onReady }: { enabled: boolean; onReady: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YT.Player | null>(null);
  const enabledRef = useRef(enabled);

  enabledRef.current = enabled;

  useEffect(() => {
    let cancelled = false;

    loadYouTubeAPI().then(() => {
      if (cancelled || !containerRef.current || playerRef.current) return;

      playerRef.current = new window.YT.Player(containerRef.current, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          playsinline: 1,
          rel: 0,
          origin: typeof window !== "undefined" ? window.location.origin : undefined,
        },
        events: {
          onReady: (event) => {
            onReady();
            event.target.setVolume(45);
            if (enabledRef.current) event.target.playVideo();
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.playVideo();
            }
          },
        },
      });
    });

    return () => {
      cancelled = true;
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [onReady]);

  useEffect(() => {
    const player = playerRef.current;
    if (!player?.playVideo) return;

    if (enabled) player.playVideo();
    else player.pauseVideo();
  }, [enabled]);

  return (
    <div ref={containerRef} id="site-audio-player" className="site-audio-player" aria-hidden />
  );
}

export function SiteAudioProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabledState] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "true") setEnabledState(true);
  }, []);

  const setEnabled = useCallback((value: boolean) => {
    setEnabledState(value);
    localStorage.setItem(STORAGE_KEY, String(value));
  }, []);

  const toggle = useCallback(() => {
    setEnabledState((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  }, []);

  const onReady = useCallback(() => setReady(true), []);

  return (
    <Ctx.Provider value={{ enabled, ready, toggle, setEnabled }}>
      {children}
      <SiteAudioPlayer enabled={enabled} onReady={onReady} />
    </Ctx.Provider>
  );
}

export function useSiteAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useSiteAudio must be used within SiteAudioProvider");
  return ctx;
}

export const SITE_AUDIO_VIDEO_ID = VIDEO_ID;
