const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const spotifyClientId = process.env.SPOTIFY_CLIENT_ID;
const spotifyClientSecret = process.env.SPOTIFY_CLIENT_SECRET;

const SPOTIFY_API_BASE_URL = 'https://api.spotify.com/v1';

const getAccessToken = async () => {
  const authOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(spotifyClientId + ':' + spotifyClientSecret).toString(
          'base64'
        ),
    },
    body: 'grant_type=client_credentials',
  };

  try {
    const response = await fetch(
      'https://accounts.spotify.com/api/token',
      authOptions
    );
    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error('Error getting Spotify access token:', error);
    throw error;
  }
};

const searchSong = async (query) => {
  const accessToken = await getAccessToken();
  const searchOptions = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };

  try {
    const response = await fetch(
      `${SPOTIFY_API_BASE_URL}/search?q=${query}&type=track`,
      searchOptions
    );
    const data = await response.json();
    if (data.tracks.items.length === 0) {
      return 'No results found for the given query.';
    }
    const results = data.tracks.items.map((track) => {
      return `\nSong: ${track.name}\nArtist: ${track.artists[0].name}\nAlbum: ${track.album.name}\nSpotify Link: ${track.external_urls.spotify}`;
    });
    return `Search results:\n${results.join('')}`;
  } catch (error) {
    console.error('Error searching for song:', error);
    throw error;
  }
};

const getSongDetails = async (songId) => {
  const accessToken = await getAccessToken();
  const songOptions = {
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + accessToken,
    },
  };

  try {
    const response = await fetch(
      `${SPOTIFY_API_BASE_URL}/tracks/${songId}`,
      songOptions
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting song details:', error);
    throw error;
  }
};

const getFlacDownloadLink = async (songId) => {
  try {
    const songDetails = await getSongDetails(songId);
    const downloadUrl = songDetails.external_urls.spotify;
    if (downloadUrl) {
      return downloadUrl;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error getting FLAC download link:', error);
    throw error;
  }
};

const getSpotifyUri = (query) => {
  if (query.startsWith('spotify:')) {
    return query;
  } else if (query.includes('spotify.com/track/')) {
    return query.replace('spotify.com/track/', 'spotify:track:');
  } else {
    return `spotify:track:${query}`;
  }
};

module.exports = {
  searchSong,
  getSongDetails,
  getFlacDownloadLink,
  getSpotifyUri,
};