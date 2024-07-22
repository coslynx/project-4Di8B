const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const { sendMessage, sendSong } = require('../services/telegram');
const { searchSong } = require('../services/search');
const { downloadSong } = require('../services/download');
const { getUser, createUser, updateUser } = require('../database/mongo');

dotenv.config();

const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
const bot = new TelegramBot(telegramToken, { polling: true });

const handleMessage = async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text;
  const userId = msg.from.id;

  if (messageText.startsWith('/start')) {
    try {
      const user = await getUser(userId);
      if (!user) {
        await createUser(userId, msg.from.username);
      }
      await sendMessage(chatId, 'Welcome to the Telegram Music Downloader Bot! Use /search to start searching for songs.');
    } catch (error) {
      console.error('Error handling /start command:', error);
      await sendMessage(chatId, 'An error occurred. Please try again later.');
    }
  } else if (messageText.startsWith('/search')) {
    try {
      const query = messageText.slice('/search '.length).trim();
      const searchResults = await searchSong(query);
      await sendMessage(chatId, searchResults);
    } catch (error) {
      console.error('Error handling /search command:', error);
      await sendMessage(chatId, 'An error occurred while searching for the song. Please try again later.');
    }
  } else if (messageText.startsWith('/download')) {
    try {
      const songId = messageText.slice('/download '.length).trim();
      const downloadLink = await downloadSong(songId);
      if (downloadLink) {
        await sendSong(chatId, downloadLink);
      } else {
        await sendMessage(chatId, 'Failed to download the song. Please try again later.');
      }
    } catch (error) {
      console.error('Error handling /download command:', error);
      await sendMessage(chatId, 'An error occurred while downloading the song. Please try again later.');
    }
  } else {
    await sendMessage(chatId, 'Invalid command. Use /search to start searching for songs or /help for more information.');
  }
};

bot.on('message', async (msg) => {
  try {
    await handleMessage(msg);
  } catch (error) {
    console.error('Error handling message:', error);
    await sendMessage(msg.chat.id, 'An unexpected error occurred. Please try again later.');
  }
});

const startBot = async () => {
  try {
    console.log('Telegram Bot Started');
  } catch (error) {
    console.error('Error starting Telegram Bot:', error);
  }
};

startBot();

module.exports = {
  sendMessage,
  sendSong,
  handleMessage,
};