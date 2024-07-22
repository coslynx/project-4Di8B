# Telegram Music Downloader Bot

This project provides a Node.js Telegram bot that utilizes the Spotify API to download songs in FLAC format and send them to the chat where the song name or link was provided. 

## Features

* **Song Search and Download:** Users can search for songs by name or Spotify link and download them in FLAC format.
* **Telegram Integration:** The bot is accessible through a dedicated Telegram chat, allowing users to interact via commands and messages.
* **MongoDB Storage:**  A MongoDB database stores user data, download history, and other relevant information.
* **User-Friendly Interface:** The bot uses clear and concise messages for commands and responses.
* **Optional Features:** 
    * **User Authentication:** Allows for personalized download history and preferences.
    * **Download Queue:** Enables multiple downloads concurrently with progress tracking.
    * **Advanced Features:**  Personalized playlists, music recommendations, and searching for albums/artists.

## Prerequisites

* **Node.js and npm:** Install the latest version of Node.js and npm.
* **MongoDB:** Set up a MongoDB database instance. You can use a hosted service like MongoDB Atlas or a local installation.
* **Telegram Account:** Create a Telegram account to interact with the bot.
* **Spotify Developer Account:** Register a Spotify developer account to obtain client ID and client secret.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/telegram-music-downloader-bot.git
   ```

2. **Navigate to the project directory:**
   ```bash
   cd telegram-music-downloader-bot
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

## Configuration

1. **Create a `.env` file:** Create a `.env` file in the project's root directory.
2. **Set environment variables:** Add the following environment variables to the `.env` file:

   ```
   TELEGRAM_BOT_TOKEN=YOUR_TELEGRAM_BOT_TOKEN
   SPOTIFY_CLIENT_ID=YOUR_SPOTIFY_CLIENT_ID
   SPOTIFY_CLIENT_SECRET=YOUR_SPOTIFY_CLIENT_SECRET
   MONGO_URI=mongodb://YOUR_MONGODB_URI
   ```

   **Note:** Replace `YOUR_TELEGRAM_BOT_TOKEN`, `YOUR_SPOTIFY_CLIENT_ID`, `YOUR_SPOTIFY_CLIENT_SECRET`, and `YOUR_MONGODB_URI` with your actual values.

## Running the Bot

1. **Start the server:**
   ```bash
   npm start
   ```

2. **Get the bot's username:**  After starting the server, you will see the bot's username in the console output.
3. **Add the bot to your Telegram chat:**  Search for the bot's username in Telegram and add it to your chat.
4. **Use the bot:** Use commands like `/search [song name]` or `/help` to interact with the bot.

## Deployment

1. **Choose a deployment platform:**  Popular options include Heroku, AWS Elastic Beanstalk, or a dedicated server.
2. **Configure the deployment process:**  Follow the platform's instructions to create a new application, set up the environment variables, and deploy the code.
3. **Update the webhook:** Set the Telegram webhook to the deployed server's URL to enable the bot to receive updates and respond to messages. 

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or fix.
3. Make your changes and commit them.
4. Push your changes to your fork.
5. Create a pull request to the main repository.

## Usage

* `/search [song name]` - Search for a song by name.
* `/help` - Display a list of available commands.

## Example Usage

1. **Search for a song:**  Send `/search Imagine Dragons Thunder` to the bot.
2. **Select a song from the results:**  The bot will display search results. Select the correct song from the list.
3. **Download the song:** The bot will download the song in FLAC format and send it to the chat.

## Note

* Ensure that you have the necessary permissions to access and use the Spotify Web API.
* This bot is for educational purposes and should not be used for illegal activities.
* This bot is in development and may have limitations or bugs.

## License

This project is licensed under the MIT License.