const axios = require('axios');
const querystring = require('querystring');

// Get Spotify access token
async function getSpotifyAccessToken() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const tokenUrl = 'https://accounts.spotify.com/api/token';
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
  };

  const data = querystring.stringify({
    grant_type: 'client_credentials',
  });

  try {
    const response = await axios.post(tokenUrl, data, { headers });
    return response.data.access_token;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw new Error('Failed to get access token');
  }
}

// Search for tracks on Spotify
async function searchSpotifyTracks(query) {
  const accessToken = await getSpotifyAccessToken();

  const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track&limit=10`;
  const headers = {
    'Authorization': `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.get(searchUrl, { headers });
    return response.data.tracks.items; // Return an array of tracks
  } catch (error) {
    console.error('Error searching Spotify tracks:', error);
    throw new Error('Failed to search tracks');
  }
}

module.exports = {
  searchSpotifyTracks,
};
