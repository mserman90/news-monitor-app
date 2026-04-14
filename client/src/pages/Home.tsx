import { useState } from 'react';
import { LiveNewsPanel } from '@/components/LiveNewsPanel';
import { LiveWebcamsPanel } from '@/components/LiveWebcamsPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Globe, Tv } from 'lucide-react';

/**
 * Home Page - Main Dashboard
 * 
 * Design: Modern Monitoring Dashboard
 * - Dark background with neon blue accents
 * - Two main sections: Live News & Live Webcams
 * - Tab-based navigation
 * - Hero background with tech aesthetic
 * - Fully responsive on mobile
 */

export default function Home() {
  const [activeTab, setActiveTab] = useState('news');

  return (
    <div
      className="min-h-screen w-full"
      style={{
        backgroundColor: '#0f1419',
        backgroundImage: `
          linear-gradient(135deg, rgba(0, 217, 255, 0.03) 0%, rgba(255, 107, 53, 0.02) 100%),
          radial-gradient(circle at 20% 50%, rgba(0, 217, 255, 0.05) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(255, 107, 53, 0.03) 0%, transparent 50%)
        `,
      }}
    >
      {/* Header */}
      <header className="border-b border-border sticky top-0 z-40 bg-background/95 backdrop-blur-sm">
        <div className="w-full px-4 py-4 md:px-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0">
              <Globe className="w-6 h-6 text-primary-foreground" />
            </div>
            <div className="min-w-0">
              <h1 className="text-xl md:text-2xl font-bold text-foreground truncate">News & Webcam Monitor</h1>
              <p className="text-xs md:text-sm text-muted-foreground truncate">Real-time global news broadcasts and live webcams</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 py-4 md:px-6 md:py-6">
        <div className="max-w-7xl mx-auto">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-card border border-border">
              <TabsTrigger
                value="news"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Tv className="w-4 h-4" />
                <span className="hidden sm:inline">Live News</span>
                <span className="sm:hidden">News</span>
              </TabsTrigger>
              <TabsTrigger
                value="webcams"
                className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">Live Webcams</span>
                <span className="sm:hidden">Webcams</span>
              </TabsTrigger>
            </TabsList>

            {/* Live News Tab */}
            <TabsContent value="news" className="space-y-4">
              <div className="bg-card/50 border border-border rounded-lg p-3 md:p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Watch 24/7 live news broadcasts from major global news networks
                  </p>
                </div>
                <LiveNewsPanel />
              </div>
            </TabsContent>

            {/* Live Webcams Tab */}
            <TabsContent value="webcams" className="space-y-4">
              <div className="bg-card/50 border border-border rounded-lg p-3 md:p-4">
                <p className="text-xs md:text-sm text-muted-foreground mb-4">
                  Explore live webcam feeds from around the world, organized by region
                </p>
                <LiveWebcamsPanel />
              </div>
            </TabsContent>
          </Tabs>

          {/* Footer Info */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Live News</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Access real-time news broadcasts from Bloomberg, CNN, Sky News, DW, Euronews, and more.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Global Webcams</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                View live feeds from major cities across Europe, Asia, Americas, Middle East, and Space.
              </p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h3 className="font-semibold text-foreground mb-2 text-sm md:text-base">Real-Time Monitoring</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                Monitor global events as they happen with our comprehensive live streaming platform.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
