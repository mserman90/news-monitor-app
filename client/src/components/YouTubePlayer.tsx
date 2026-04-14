import { useEffect, useRef, useState } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  title: string;
  onReady?: () => void;
  onError?: (error: number) => void;
  muted?: boolean;
  autoplay?: boolean;
  className?: string;
}

/**
 * YouTube IFrame Player Component
 * 
 * Design: Minimal wrapper with neon border on focus
 * - Dark background (#1a1f2e)
 * - Neon blue accent (#00d9ff) on selection
 * - Smooth transitions
 */

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: Record<string, unknown>
      ) => YouTubePlayerInstance;
    };
    onYouTubeIframeAPIReady?: () => void;
  }
}

interface YouTubePlayerInstance {
  mute(): void;
  unMute(): void;
  playVideo(): void;
  pauseVideo(): void;
  loadVideoById(videoId: string): void;
  destroy(): void;
}

export function YouTubePlayer({
  videoId,
  title,
  onReady,
  onError,
  muted = true,
  autoplay = true,
  className = '',
}: YouTubePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayerInstance | null>(null);
  const [isReady, setIsReady] = useState(false);

  // Load YouTube IFrame API
  useEffect(() => {
    if (window.YT) {
      setIsReady(true);
      return;
    }

    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      setIsReady(true);
    };
  }, []);

  // Initialize player
  useEffect(() => {
    if (!isReady || !containerRef.current || !window.YT) return;

    const playerId = `youtube-player-${videoId}-${Math.random().toString(36).substr(2, 9)}`;
    containerRef.current.id = playerId;

    try {
      playerRef.current = new window.YT.Player(playerId, {
        videoId,
        playerVars: {
          autoplay: autoplay ? 1 : 0,
          controls: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          fs: 1,
          playsinline: 1,
        },
        events: {
          onReady: () => {
            if (muted && playerRef.current) {
              playerRef.current.mute();
            }
            onReady?.();
          },
          onError: (event: { data: number }) => {
            onError?.(event.data);
          },
        },
      });
    } catch (error) {
      console.error('Failed to initialize YouTube player:', error);
    }

    return () => {
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [isReady, videoId, muted, autoplay, onReady, onError]);

  // Update video when videoId changes
  useEffect(() => {
    if (playerRef.current && videoId) {
      try {
        playerRef.current.loadVideoById(videoId);
      } catch (error) {
        console.error('Failed to load video:', error);
      }
    }
  }, [videoId]);

  return (
    <div
      className={`relative w-full bg-card rounded-lg overflow-hidden ${className}`}
      style={{
        aspectRatio: '16 / 9',
        border: '2px solid #2d3748',
        transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = '#00d9ff';
        el.style.boxShadow = '0 0 20px rgba(0, 217, 255, 0.3)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = '#2d3748';
        el.style.boxShadow = 'none';
      }}
    >
      <div
        ref={containerRef}
        className="w-full h-full"
        title={title}
      />
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center bg-card/90 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-10 h-10 border-3 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-sm text-muted-foreground font-medium">Loading stream...</p>
          </div>
        </div>
      )}
    </div>
  );
}
