import {EnvironmentPlugin} from 'webpack';
import {config} from 'dotenv';

config();

module.exports = {
  plugins: [
    new EnvironmentPlugin([
      'BACK_HOST',
      'COOKIE_EXPIRE_DAYS',
      'DOMAIN',
      'FIREBASE_API_KEY',
      'FIREBASE_AUTH_DOMAIN',
      'FIREBASE_PROJECT_ID',
      'FIREBASE_STORAGE_BUCKET',
      'FIREBASE_MESSAGING_SENDER_ID',
      'FIREBASE_APP_ID',
      'FIREBASE_MEASUREMENT_ID',
    ])
  ]
}
