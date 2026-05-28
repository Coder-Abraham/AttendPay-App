/**
 * Expo config – loads .env so EXPO_PUBLIC_* vars are baked into release APK bundles.
 * @see https://docs.expo.dev/guides/environment-variables/
 */
const path = require('path');
const { config: loadEnv } = require('dotenv');

loadEnv({ path: path.resolve(__dirname, '.env') });

const appJson = require('./app.json');

module.exports = () => ({
  ...appJson.expo,
  extra: {
    ...appJson.expo.extra,
    apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://127.0.0.1:8000/api',
  },
});
