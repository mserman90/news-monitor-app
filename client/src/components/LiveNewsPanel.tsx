import { useState, useEffect } from 'react';
import { getAllLiveChannels, LiveChannel } from '@/lib/channels';
import { YouTubePlayer } from './YouTubePlayer';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

/**
 * Live News Panel Component
 * 
 * Design: Modern monitoring dashboard
 * - Main player with neon blue border
 * - Channel carousel below
 * - Live indicator badge
 * - Fullscreen support
 * - Responsive on mobile
 */

interface LiveNewsPanelProps {
  onChannelChange?: (channel: LiveChannel) => void;
}

export function LiveNewsPanel({ onChannelChange }: LiveNewsPanelProps) {
  const [allChannels, setAllChannels] = useState<LiveChannel[]>([]);
  const [selectedChannel, setSelectedChannel] = useState<LiveChannel | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [carouselStart, setCarouselStart] = useState(0);

  useEffect(() => {
    const channels = getAllLiveChannels();
    setAllChannels(channels);
    setSelectedChannel(channels[0] || null);
  }, []);

  const handleChannelSelect = (channel: LiveChannel) => {
    setSelectedChannel(channel);
    onChannelChange?.(channel);
  };

  const handleFullscreen = () => {
    const element = document.getElementById('live-news-container');
    if (!isFullscreen && element?.requestFullscreen) {
      element.requestFullscreen().catch(err => console.error('Fullscreen error:', err));
      setIsFullscreen(true);
    } else if (isFullscreen && document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    document.addEventListener('keydown', handleEscapeKey);
    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, [isFullscreen]);

  const visibleChannels = allChannels.slice(carouselStart, carouselStart + 5);
  const canScrollLeft = carouselStart > 0;
  const canScrollRight = carouselStart + 5 < allChannels.length;

  return (
    <div
      id="live-news-container"
      className={`w-full bg-background rounded-lg overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : ''
      }`}
      style={{
        backgroundColor: '#0f1419',
      }}
    >
      <div className={`flex flex-col h-full ${isFullscreen ? 'p-4' : 'p-4'}`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-4 gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center gap-2 flex-shrink-0">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span className="text-xs font-bold text-red-500 tracking-widest">LIVE</span>
            </div>
            <h2 className="text-lg font-bold text-foreground truncate">{selectedChannel?.name || 'Loading...'}</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFullscreen}
            className="text-primary hover:bg-card flex-shrink-0"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Main Player */}
        <div className={`flex-1 mb-4 min-h-0 ${isFullscreen ? 'mb-6' : ''}`}>
          {selectedChannel && (
            <YouTubePlayer
              videoId={selectedChannel.fallbackVideoId || ''}
              title={selectedChannel.name}
              muted={true}
              autoplay={true}
              className="w-full h-full"
            />
          )}
        </div>

        {/* Channel Carousel */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCarouselStart(Math.max(0, carouselStart - 1))}
            disabled={!canScrollLeft}
            className="border-border hover:border-primary hover:text-primary flex-shrink-0"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex-1 flex gap-2 overflow-x-auto">
            {visibleChannels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => handleChannelSelect(channel)}
                className={`px-3 py-2 rounded text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0 ${
                  selectedChannel?.id === channel.id
                    ? 'bg-primary text-primary-foreground border-2 border-primary'
                    : 'bg-card text-foreground border-2 border-border hover:border-primary'
                }`}
              >
                {channel.name}
              </button>
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setCarouselStart(Math.min(allChannels.length - 5, carouselStart + 1))}
            disabled={!canScrollRight}
            className="border-border hover:border-primary hover:text-primary flex-shrink-0"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
