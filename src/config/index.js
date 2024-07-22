const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  telegramToken: process.env.TELEGRAM_BOT_TOKEN,
  spotifyClientId: process.env.SPOTIFY_CLIENT_ID,
  spotifyClientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  mongoUri: process.env.MONGO_URI,
  port: process.env.PORT || 3000,
};