import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'br.edu.utfpr.marvas.benchmark_ionic',
  appName: 'benchmark-ionic-react-app',
  webDir: 'dist',
  server: {
    androidScheme: 'http'
  }
};

export default config;
