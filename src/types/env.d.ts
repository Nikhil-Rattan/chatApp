declare module 'react-native-config' {
  export interface NativeConfig {
    API_BASE_URL: string;
    APP_NAME: string;
    APP_VERSION: string;
  }

  const Config: NativeConfig;
  export default Config;
}
