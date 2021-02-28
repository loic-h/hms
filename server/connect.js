const axios = require('axios');

const buff = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`);
const base64Authorization = buff.toString('base64');

module.exports = async () => {
  const response = await axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Authorization': `Basic ${base64Authorization}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params: {
      grant_type: 'client_credentials'
    }
  });
  return response.data.access_token;
};
