import 'dotenv/config';

export default {
  expo: {
    name: 'fitness-tracker',
    slug: 'fitness-tracker',
    version: '1.0.0',
    orientation: 'portrait',
    icon: './assets/images/icon.png',
    scheme: 'myapp',
    userInterfaceStyle: 'automatic',
    splash: {
      image: './assets/images/splash-icon.png',
      resizeMode: 'contain',
      backgroundColor: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/images/adaptive-icon.png',
        backgroundColor: '#ffffff',
      },
      package: 'com.ogig.fitnesstracker',
    },
    web: {
      bundler: 'metro',
      output: 'static',
      favicon: './assets/images/favicon.png',
    },
    plugins: ['expo-router', 'expo-localization'],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      projectId: process.env.EXPO_PROJECT_ID,
      eas: {
        projectId: process.env.EXPO_PROJECT_ID,
      },
    },
  },
};
