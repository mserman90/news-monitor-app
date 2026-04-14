# News & Webcam Monitor - Tasarım Konsepti

## Seçilen Tasarım Felsefesi: Modern Monitoring Dashboard

### Design Movement
**Minimalist Monitoring Aesthetic** - Gerçek zamanlı veri izleme arayüzleri ve kontrol panellerinden ilham alan, temiz ve işlevsel bir tasarım.

### Core Principles
1. **Bilgi Hiyerarşisi** - En önemli içerik (canlı yayınlar) merkezdedir, kontroller ve filtreler ikincil
2. **Hızlı Tarama** - Kullanıcılar bir bakışta birden fazla kanal/kamera görebilir
3. **Minimal Distraction** - Karanlık arka plan, yüksek kontrast, net tipografi
4. **Responsive Interactivity** - Hızlı geçişler, smooth animasyonlar, anında feedback

### Color Philosophy
- **Arka Plan**: Koyu gri-siyah (`#0f1419`) - TV/monitor ekranı hissiyatı
- **Aksenler**: Elektrik mavisi (`#00d9ff`) - Canlı, modern, enerji dolu
- **Metin**: Açık gri (`#e5e7eb`) - Yüksek kontrast, okunabilir
- **Vurgu**: Turuncu/kırmızı (`#ff6b35`) - Canlı yayın göstergesi

### Layout Paradigm
- **Asimetrik Grid**: Ana yayın bölümü (büyük), yan panel (filtreler/kanallar)
- **Kart Tabanlı Grid**: 2x2 veya 4x1 web kamera düzeni
- **Sticky Header**: Kanal seçimi ve kontroller her zaman erişilebilir

### Signature Elements
1. **Neon Accent Borders** - Seçili kanal/kamera etrafında parlak mavi çerçeve
2. **Live Indicator Badge** - Kırmızı pulsing dot + "LIVE" yazısı
3. **Smooth Transitions** - 300ms ease-in-out geçişler

### Interaction Philosophy
- Kanallar arasında hızlı geçiş (click/keyboard)
- Bölge filtreleri anında güncellenir
- Tam ekran modu ESC ile çıkılabilir
- Hover efektleri kontroller vurgular

### Animation
- **Channel Switch**: 200ms fade + scale (0.95 → 1)
- **Grid Layout**: Staggered entrance (100ms delay per item)
- **Hover States**: Brightness +10%, border glow
- **Live Badge**: Subtle pulse (1s cycle)

### Typography System
- **Display**: "Courier Prime" (monospace) - Teknik, profesyonel
- **Body**: "Inter" (sans-serif) - Temiz, modern
- **Hierarchy**: 
  - Channel names: 16px bold
  - Region labels: 12px medium
  - Metadata: 11px regular

## Uygulama Yapısı

### Sayfalar
1. **Home** - Ana dashboard (haberler + kameralar)
2. **Settings** - Kanal seçimi, tercihler
3. **404** - Bulunamadı sayfası

### Bileşenler
- `LiveNewsPanel` - Haber kanalları grid
- `LiveWebcamsPanel` - Web kamera grid
- `ChannelSelector` - Kanal seçim dropdown
- `RegionFilter` - Bölge filtreleme butonları
- `LiveIndicator` - Canlı yayın göstergesi
