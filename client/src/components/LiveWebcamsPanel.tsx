import { useState, useMemo } from 'react';
import { WEBCAM_FEEDS, WEBCAM_REGIONS, REGION_LABELS, WebcamRegion } from '@/lib/channels';
import { YouTubePlayer } from './YouTubePlayer';
import { Button } from '@/components/ui/button';
import { Maximize2 } from 'lucide-react';

/**
 * Live Webcams Panel Component
 * 
 * Design: Grid-based monitoring dashboard
 * - Region filters with neon accents
 * - 2x2 grid view for multiple cameras
 * - Single camera fullscreen mode
 * - Responsive on mobile (1 column)
 * - Smooth transitions between regions
 */

interface LiveWebcamsPanelProps {
  onCameraChange?: (cameraId: string) => void;
}

export function LiveWebcamsPanel({ onCameraChange }: LiveWebcamsPanelProps) {
  const [selectedRegion, setSelectedRegion] = useState<WebcamRegion>('iran');
  const [selectedCameraId, setSelectedCameraId] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const filteredCameras = useMemo(() => {
    return WEBCAM_FEEDS.filter(feed => feed.region === selectedRegion);
  }, [selectedRegion]);

  const displayCameras = selectedCameraId
    ? filteredCameras.filter(c => c.id === selectedCameraId)
    : filteredCameras.slice(0, 4);

  const selectedCamera = filteredCameras.find(c => c.id === selectedCameraId);

  const handleCameraSelect = (cameraId: string) => {
    setSelectedCameraId(cameraId === selectedCameraId ? null : cameraId);
    onCameraChange?.(cameraId);
  };

  const handleFullscreen = () => {
    const element = document.getElementById('webcams-container');
    if (!isFullscreen && element?.requestFullscreen) {
      element.requestFullscreen().catch(err => console.error('Fullscreen error:', err));
      setIsFullscreen(true);
    } else if (isFullscreen && document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div
      id="webcams-container"
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
          <h2 className="text-lg font-bold text-foreground truncate">
            Live Webcams - {REGION_LABELS[selectedRegion]}
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFullscreen}
            className="text-primary hover:bg-card flex-shrink-0"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>

        {/* Region Filters */}
        <div className="flex gap-2 mb-4 flex-wrap overflow-x-auto pb-2">
          {WEBCAM_REGIONS.map((region) => (
            <Button
              key={region}
              variant={selectedRegion === region ? 'default' : 'outline'}
              size="sm"
              onClick={() => {
                setSelectedRegion(region);
                setSelectedCameraId(null);
              }}
              className={
                selectedRegion === region
                  ? 'bg-primary text-primary-foreground border-primary flex-shrink-0'
                  : 'border-border hover:border-primary flex-shrink-0'
              }
            >
              {REGION_LABELS[region]}
            </Button>
          ))}
        </div>

        {/* Cameras Grid */}
        <div className="flex-1 min-h-0">
          {selectedCameraId && selectedCamera ? (
            // Single Camera View
            <div className="h-full flex flex-col">
              <div className="mb-3 flex items-center gap-2 flex-shrink-0">
                <div className="w-2 h-2 bg-primary rounded-full" />
                <span className="text-sm font-medium text-foreground truncate">
                  {selectedCamera.city}, {selectedCamera.country}
                </span>
              </div>
              <div className="flex-1 min-h-0">
                <YouTubePlayer
                  videoId={selectedCamera.fallbackVideoId}
                  title={`${selectedCamera.city} - ${selectedCamera.country}`}
                  muted={true}
                  autoplay={true}
                  className="w-full h-full"
                />
              </div>
            </div>
          ) : (
            // Grid View (responsive: 2x2 on desktop, 1 column on mobile)
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-full auto-rows-fr">
              {displayCameras.map((camera) => (
                <div
                  key={camera.id}
                  className="flex flex-col bg-card rounded-lg overflow-hidden cursor-pointer group"
                  onClick={() => handleCameraSelect(camera.id)}
                  style={{
                    border: '2px solid #2d3748',
                    transition: 'all 0.3s ease',
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
                  <div className="flex-1 min-h-0">
                    <YouTubePlayer
                      videoId={camera.fallbackVideoId}
                      title={`${camera.city} - ${camera.country}`}
                      muted={true}
                      autoplay={false}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="bg-card border-t border-border p-2">
                    <p className="text-xs font-semibold text-foreground truncate">
                      {camera.city}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {camera.country}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Camera List (when single view) */}
        {selectedCameraId && (
          <div className="mt-4 flex gap-2 flex-wrap overflow-x-auto pb-2">
            {filteredCameras.map((camera) => (
              <Button
                key={camera.id}
                variant={selectedCameraId === camera.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleCameraSelect(camera.id)}
                className={
                  selectedCameraId === camera.id
                    ? 'bg-primary text-primary-foreground border-primary flex-shrink-0'
                    : 'border-border hover:border-primary flex-shrink-0'
                }
              >
                {camera.city}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
