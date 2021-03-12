const axios = require('axios');
const connect = require('../server/connect');

module.exports = async (req, res) => {
  try {
    const accessToken = await connect();
    const response = await axios({
      method: 'get',
      url: 'https://api.spotify.com/v1/search',
      headers: {
       'Authorization': `Bearer ${accessToken}`
      },
      json: true,
      params: {
        q: req.query.q,
        type: req.query.type
      }
    });
    res.json({
      status: "ok",
      body: {
        items: response.data.playlists.items
      }
    });
  } catch(err) {
    console.error(err)
    res.status(err.response.status).send(err.response.statusText);
  }
};
