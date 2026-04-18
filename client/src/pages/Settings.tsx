import { useState, useEffect } from 'react';
import { getAllLiveChannels, getCustomChannels, addCustomChannel, removeCustomChannel, isCustomChannel, LiveChannel } from '@/lib/channels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Trash2, ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';

/**
 * Settings Page - Kanal Yönetimi
 * 
 * Design: Modern Monitoring Dashboard
 * - Kanal ekleme formu
 * - Özel kanalları yönetme
 * - Varsayılan kanalları görüntüleme
 */

export default function Settings() {
  const [, setLocation] = useLocation();
  const [channels, setChannels] = useState<LiveChannel[]>([]);
  const [customChannels, setCustomChannels] = useState<LiveChannel[]>([]);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    handle: '',
    fallbackVideoId: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const allChannels = getAllLiveChannels();
    const custom = getCustomChannels();
    setChannels(allChannels);
    setCustomChannels(custom);
  }, []);

  const handleAddChannel = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.name.trim() || !formData.fallbackVideoId.trim()) {
      setError('Kanal adı ve video ID gereklidir');
      return;
    }

    const newChannel: LiveChannel = {
      id: `custom-${Date.now()}`,
      name: formData.name.trim(),
      handle: formData.handle.trim() || undefined,
      fallbackVideoId: formData.fallbackVideoId.trim(),
    };

    if (addCustomChannel(newChannel)) {
      setChannels([...channels, newChannel]);
      setCustomChannels([...customChannels, newChannel]);
      setFormData({ name: '', handle: '', fallbackVideoId: '' });
      setSuccess(`"${newChannel.name}" başarıyla eklendi!`);
      setTimeout(() => setSuccess(''), 3000);
    } else {
      setError('Kanal eklenirken hata oluştu');
    }
  };

  const handleRemoveChannel = (channelId: string) => {
    if (removeCustomChannel(channelId)) {
      const updated = customChannels.filter(c => c.id !== channelId);
      setCustomChannels(updated);
      setChannels(channels.filter(c => c.id !== channelId));
      setSuccess('Kanal başarıyla silindi!');
      setTimeout(() => setSuccess(''), 3000);
    }
  };

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
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLocation('/')}
              className="text-primary hover:bg-card"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-xl md:text-2xl font-bold text-foreground">Kanal Ayarları</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 py-6 md:px-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Add Channel Form */}
          <div className="bg-card border border-border rounded-lg p-4 md:p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">Yeni Kanal Ekle</h2>
            
            <form onSubmit={handleAddChannel} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Kanal Adı *
                </label>
                <Input
                  type="text"
                  placeholder="örn: TRT Haber"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  YouTube Handle (opsiyonel)
                </label>
                <Input
                  type="text"
                  placeholder="örn: @trthaber"
                  value={formData.handle}
                  onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  YouTube Video ID * 
                  <span className="text-xs text-muted-foreground ml-2">
                    (youtube.com/watch?v=<span className="text-primary">VIDEO_ID</span>)
                  </span>
                </label>
                <Input
                  type="text"
                  placeholder="örn: dQw4w9WgXcQ"
                  value={formData.fallbackVideoId}
                  onChange={(e) => setFormData({ ...formData, fallbackVideoId: e.target.value })}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                />
              </div>

              {error && (
                <div className="bg-destructive/10 border border-destructive/30 rounded p-3">
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              {success && (
                <div className="bg-primary/10 border border-primary/30 rounded p-3">
                  <p className="text-sm text-primary">{success}</p>
                </div>
              )}

              <Button
                type="submit"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Plus className="w-4 h-4 mr-2" />
                Kanal Ekle
              </Button>
            </form>
          </div>

          {/* Custom Channels */}
          {customChannels.length > 0 && (
            <div className="bg-card border border-border rounded-lg p-4 md:p-6">
              <h2 className="text-lg font-bold text-foreground mb-4">
                Özel Kanallar ({customChannels.length})
              </h2>
              
              <div className="space-y-2">
                {customChannels.map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-center justify-between p-3 bg-background/50 rounded border border-border hover:border-primary transition-colors"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">{channel.name}</p>
                      {channel.handle && (
                        <p className="text-xs text-muted-foreground truncate">{channel.handle}</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveChannel(channel.id)}
                      className="text-destructive hover:bg-destructive/10 flex-shrink-0 ml-2"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Default Channels Info */}
          <div className="bg-card border border-border rounded-lg p-4 md:p-6">
            <h2 className="text-lg font-bold text-foreground mb-4">
              Varsayılan Kanallar ({channels.length - customChannels.length})
            </h2>
            
            <div className="space-y-2">
              {channels
                .filter(c => !isCustomChannel(c.id))
                .map((channel) => (
                  <div
                    key={channel.id}
                    className="flex items-center justify-between p-3 bg-background/50 rounded border border-border"
                  >
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">{channel.name}</p>
                      {channel.handle && (
                        <p className="text-xs text-muted-foreground truncate">{channel.handle}</p>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">Varsayılan</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-4">
            <h3 className="font-semibold text-foreground mb-2">YouTube Video ID Nasıl Bulunur?</h3>
            <ol className="text-sm text-muted-foreground space-y-1 list-decimal list-inside">
              <li>YouTube'da canlı yayın videosunu açın</li>
              <li>URL'de <span className="text-primary font-mono">watch?v=</span> sonrasındaki kodu kopyalayın</li>
              <li>Örnek: youtube.com/watch?v=<span className="text-primary font-mono">dQw4w9WgXcQ</span></li>
            </ol>
          </div>
        </div>
      </main>
    </div>
  );
}
