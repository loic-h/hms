const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config({ path: `.env.${process.env.NODE_ENV}.local` });

const router = express.Router();
const buff = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`);
const base64Authorization = buff.toString('base64');

let accessToken;

router.get('/connect', async (req, res) => {
  try {
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
    accessToken = response.data.access_token;
    if (!accessToken) {
      throw new Error("no spotify access token");
    }
    res.json({
      status: "ok",
    });
  } catch(err) {
    console.log(err);
    res.sendStatus(403);
  }
});

router.get('/search', async (req, res) => {
  try {
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
    console.log(err);
    res.sendStatus(404);
  }
});

router.get('/playlists/:id', async (req, res) => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://api.spotify.com/v1/playlists/${req.params.id}/tracks`,
      headers: {
       'Authorization': `Bearer ${accessToken}`
      },
      params: { market: 'IT' },
      json: true
    });
    res.json({
      status: "ok",
      body: {
        items: response.data.items.map(a => {
          return {
            id: a.track.id,
            preview: a.track.preview_url,
            artists: a.track.artists.map(b => b.name),
            name: a.track.name
          };
        })
      }
    });
  } catch(err) {
    console.log(err);
    res.sendStatus(404);
  }
});



module.exports = router;
