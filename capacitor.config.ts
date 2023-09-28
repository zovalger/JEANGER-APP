import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.jeanger.app',
  appName: 'Jeanger',
  webDir: 'out',
  server: {
    androidScheme: 'https'
  }
};

export default config;
