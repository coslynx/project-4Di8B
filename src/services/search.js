const { searchSong, getSpotifyUri } = require('../utils/spotify');

const searchSongByNameOrLink = async (query) => {
  try {
    const spotifyUri = getSpotifyUri(query);
    const searchResults = await searchSong(spotifyUri);
    return searchResults;
  } catch (error) {
    console.error('Error searching for song:', error);
    throw error;
  }
};

module.exports = {
  searchSongByNameOrLink,
};