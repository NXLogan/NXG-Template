declare namespace YT {
  const Player: typeof Player;
  const PlayerState: {
    ENDED: number;
    PLAYING: number;
    PAUSED: number;
    BUFFERING: number;
    CUED: number;
  };

  class Player {
    constructor(
      element: HTMLElement | string,
      options: {
        videoId?: string;
        playerVars?: Record<string, string | number | undefined>;
        events?: {
          onReady?: (event: { target: Player }) => void;
          onStateChange?: (event: { data: number; target: Player }) => void;
        };
      },
    );
    playVideo(): void;
    pauseVideo(): void;
    setVolume(volume: number): void;
    destroy(): void;
  }
}

interface Window {
  YT: typeof YT;
  onYouTubeIframeAPIReady?: () => void;
}

export {};
