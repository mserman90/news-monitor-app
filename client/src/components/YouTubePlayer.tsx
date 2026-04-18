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

declare global {
  interface Window {
    YT?: {
      Player: new (
        elementId: string | HTMLElement,
        options: Record<string, unknown>
      ) => YouTubePlayerInstance;
      PlayerState?: {
        UNSTARTED: number;
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        BUFFERING: number;
        CUED: number;
      };
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
  getPlayerState(): number;
}

/**
 * YouTube IFrame Player Component
 * 
 * Design: Minimal wrapper with neon border on focus
 * - Dark background (#1a1f2e)
 * - Neon blue accent (#00d9ff) on selection
 * - Smooth transitions
 * - Robust error handling and lifecycle management
 */

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
  const [isApiReady, setIsApiReady] = useState(false);
  const [isPlayerReady, setIsPlayerReady] = useState(false);
  const playerIdRef = useRef<string>('');

  // Load YouTube IFrame API
  useEffect(() => {
    // Check if API is already loaded
    if (window.YT?.Player) {
      setIsApiReady(true);
      return;
    }

    // Check if script is already loading
    if (document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      window.onYouTubeIframeAPIReady = () => {
        setIsApiReady(true);
      };
      return;
    }

    // Load the API script
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    tag.async = true;

    window.onYouTubeIframeAPIReady = () => {
      setIsApiReady(true);
    };

    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);

    return () => {
      delete window.onYouTubeIframeAPIReady;
    };
  }, []);

  // Initialize player when API is ready and container exists
  useEffect(() => {
    if (!isApiReady || !containerRef.current || !window.YT?.Player) return;

    // Generate unique player ID
    playerIdRef.current = `youtube-player-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    containerRef.current.id = playerIdRef.current;

    // Only create player if not already created
    if (playerRef.current) {
      return;
    }

    try {
      const player = new window.YT.Player(playerIdRef.current, {
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
          onReady: (event: { target: YouTubePlayerInstance }) => {
            playerRef.current = event.target;
            if (muted) {
              try {
                event.target.mute();
              } catch (e) {
                console.error('Error muting player:', e);
              }
            }
            setIsPlayerReady(true);
            onReady?.();
          },
          onError: (event: { data: number }) => {
            console.error('YouTube player error:', event.data);
            onError?.(event.data);
          },
        },
      });

      playerRef.current = player;
    } catch (error) {
      console.error('Failed to initialize YouTube player:', error);
    }

    // Cleanup on unmount
    return () => {
      if (playerRef.current) {
        try {
          playerRef.current.destroy();
        } catch (e) {
          console.error('Error destroying player:', e);
        }
        playerRef.current = null;
      }
      setIsPlayerReady(false);
    };
  }, [isApiReady, videoId, muted, autoplay, onReady, onError]);

  // Load new video when videoId changes (only after player is ready)
  useEffect(() => {
    if (!playerRef.current || !videoId || !isPlayerReady) return;

    // Small delay to ensure player is fully ready
    const timer = setTimeout(() => {
      if (playerRef.current && videoId) {
        try {
          playerRef.current.loadVideoById(videoId);
        } catch (error) {
          console.error('Failed to load video:', error);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [videoId, isPlayerReady]);

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
      {!isPlayerReady && (
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
