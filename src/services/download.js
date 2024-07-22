const fetch = require('node-fetch');
const fs = require('fs');
const { getFlacDownloadLink } = require('../utils/spotify');

const downloadSong = async (songId) => {
  try {
    const downloadLink = await getFlacDownloadLink(songId);
    if (!downloadLink) {
      return null;
    }

    const response = await fetch(downloadLink);

    if (!response.ok) {
      throw new Error(`Download failed with status code: ${response.status}`);
    }

    const buffer = await response.buffer();

    // Create a unique filename based on the song ID
    const fileName = `${songId}.flac`;
    const filePath = `./downloads/${fileName}`;

    // Write the downloaded FLAC data to a file
    fs.writeFileSync(filePath, buffer);

    return fileName;
  } catch (error) {
    console.error('Error downloading song:', error);
    throw error;
  }
};

module.exports = {
  downloadSong,
};