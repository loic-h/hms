const axios = require('axios');
const connect = require('../server/connect');

module.exports = async (req, res) => {
  try {
    const accessToken = await connect();
    const response = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/playlists/${req.query.id}`,
      headers: {
       'Authorization': `Bearer ${accessToken}`
      },
      params: { market: 'IT' },
      json: true
    });
    const { name, tracks } = response.data;
    const items = tracks.items.map(a => {
      return {
        id: a.track.id,
        preview: a.track.preview_url,
        artists: a.track.artists.map(b => b.name),
        name: a.track.name
      };
    })
    res.json({
      status: "ok",
      body: {
        name,
        items
      }
    });
  } catch(err) {
    console.error(err);
    res.sendStatus(404);
  }
};
