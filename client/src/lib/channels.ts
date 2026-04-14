/**
 * Live News Channels & Webcams Data
 * 
 * Design Philosophy: Modern Monitoring Dashboard
 * - Dark background with neon blue accents
 * - Clean, minimal UI with high contrast
 * - Real-time data streams from YouTube
 */

export interface LiveChannel {
  id: string;
  name: string;
  handle?: string;
  fallbackVideoId?: string;
  isLive?: boolean;
  videoId?: string;
}

export interface WebcamFeed {
  id: string;
  city: string;
  country: string;
  region: WebcamRegion;
  channelHandle: string;
  fallbackVideoId: string;
}

export type WebcamRegion = 'iran' | 'middle-east' | 'europe' | 'americas' | 'asia' | 'space';

// Live News Channels - 24/7 global news broadcasts
export const LIVE_NEWS_CHANNELS: LiveChannel[] = [
  { id: 'bloomberg', name: 'Bloomberg', handle: '@markets', fallbackVideoId: 'iEpJwprxDdk' },
  { id: 'sky', name: 'Sky News', handle: '@SkyNews', fallbackVideoId: 'uvviIF4725I' },
  { id: 'euronews', name: 'Euronews', handle: '@euronews', fallbackVideoId: 'pykpO5kQJ98' },
  { id: 'dw', name: 'DW News', handle: '@DWNews', fallbackVideoId: 'LuKwFajn37U' },
  { id: 'cnbc', name: 'CNBC', handle: '@CNBC', fallbackVideoId: '9NyxcX3rhQs' },
  { id: 'cnn', name: 'CNN', handle: '@CNN', fallbackVideoId: 'w_Ma8oQLmSM' },
  { id: 'france24', name: 'France 24', handle: '@FRANCE24', fallbackVideoId: 'u9foWyMSETk' },
  { id: 'alarabiya', name: 'Al Arabiya', handle: '@AlArabiya', fallbackVideoId: 'n7eQejkXbnM' },
  { id: 'aljazeera', name: 'Al Jazeera', handle: '@AlJazeeraEnglish', fallbackVideoId: 'gCNeDWCI0vo' },
  { id: 'bbc', name: 'BBC News', handle: '@BBCNews', fallbackVideoId: 'bjgQzJzCZKs' },
];

// Web Cameras - Live feeds from around the world
export const WEBCAM_FEEDS: WebcamFeed[] = [
  // Iran & Middle East Conflict Zone
  { id: 'iran-tehran', city: 'Tehran', country: 'Iran', region: 'iran', channelHandle: '@IranHDCams', fallbackVideoId: '-zGuR1qVKrU' },
  { id: 'iran-telaviv', city: 'Tel Aviv', country: 'Israel', region: 'iran', channelHandle: '@IsraelLiveCam', fallbackVideoId: 'gmtlJ_m2r5A' },
  { id: 'iran-jerusalem', city: 'Jerusalem', country: 'Israel', region: 'iran', channelHandle: '@JerusalemLive', fallbackVideoId: 'fIurYTprwzg' },
  
  // Middle East
  { id: 'jerusalem', city: 'Jerusalem', country: 'Israel', region: 'middle-east', channelHandle: '@TheWesternWall', fallbackVideoId: 'e34xb-Fbl0U' },
  { id: 'tehran', city: 'Tehran', country: 'Iran', region: 'middle-east', channelHandle: '@IranHDCams', fallbackVideoId: '-zGuR1qVKrU' },
  { id: 'tel-aviv', city: 'Tel Aviv', country: 'Israel', region: 'middle-east', channelHandle: '@IsraelLiveCam', fallbackVideoId: 'gmtlJ_m2r5A' },
  { id: 'mecca', city: 'Mecca', country: 'Saudi Arabia', region: 'middle-east', channelHandle: '@MakkahLive', fallbackVideoId: 'Cm1v4bteXbI' },
  
  // Europe
  { id: 'kyiv', city: 'Kyiv', country: 'Ukraine', region: 'europe', channelHandle: '@DWNews', fallbackVideoId: '-Q7FuPINDjA' },
  { id: 'paris', city: 'Paris', country: 'France', region: 'europe', channelHandle: '@PalaisIena', fallbackVideoId: 'OzYp4NRZlwQ' },
  { id: 'london', city: 'London', country: 'UK', region: 'europe', channelHandle: '@EarthCam', fallbackVideoId: 'Lxqcg1qt0XU' },
  { id: 'berlin', city: 'Berlin', country: 'Germany', region: 'europe', channelHandle: '@BerlinLive', fallbackVideoId: 'CjtIYbmVfck' },
  
  // Americas
  { id: 'washington', city: 'Washington DC', country: 'USA', region: 'americas', channelHandle: '@AxisCommunications', fallbackVideoId: '1wV9lLe14aU' },
  { id: 'new-york', city: 'New York', country: 'USA', region: 'americas', channelHandle: '@EarthCam', fallbackVideoId: '4qyZLflp-sI' },
  { id: 'los-angeles', city: 'Los Angeles', country: 'USA', region: 'americas', channelHandle: '@VeniceVHotel', fallbackVideoId: 'EO_1LWqsCNE' },
  
  // Asia-Pacific
  { id: 'taipei', city: 'Taipei', country: 'Taiwan', region: 'asia', channelHandle: '@JackyWuTaipei', fallbackVideoId: 'z_fY1pj1VBw' },
  { id: 'shanghai', city: 'Shanghai', country: 'China', region: 'asia', channelHandle: '@SkylineWebcams', fallbackVideoId: '76EwqI5XZIc' },
  { id: 'tokyo', city: 'Tokyo', country: 'Japan', region: 'asia', channelHandle: '@TokyoLiveCam4K', fallbackVideoId: '_k-5U7IeK8g' },
  { id: 'sydney', city: 'Sydney', country: 'Australia', region: 'asia', channelHandle: '@WebcamSydney', fallbackVideoId: '7pcL-0Wo77U' },
  
  // Space
  { id: 'iss-earth', city: 'ISS Earth View', country: 'Space', region: 'space', channelHandle: '@NASA', fallbackVideoId: 'vytmBNhc9ig' },
  { id: 'nasa-live', city: 'NASA TV', country: 'Space', region: 'space', channelHandle: '@NASA', fallbackVideoId: 'zPH5KtjJFaQ' },
  { id: 'spacex', city: 'SpaceX', country: 'Space', region: 'space', channelHandle: '@SpaceX', fallbackVideoId: 'fO9e9jnhYK8' },
];

export const WEBCAM_REGIONS: WebcamRegion[] = ['iran', 'middle-east', 'europe', 'americas', 'asia', 'space'];

export const REGION_LABELS: Record<WebcamRegion, string> = {
  iran: 'Iran & Middle East',
  'middle-east': 'Middle East',
  europe: 'Europe',
  americas: 'Americas',
  asia: 'Asia-Pacific',
  space: 'Space',
};
