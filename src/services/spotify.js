import globals from '../utils/globals';

const authorizeUrl = new URL('https://accounts.spotify.com/authorize');
let player;
let playerId;

const authorizeEndpoint = (slug = '') => {
  const redirectUrl = new URL(slug, window.location.origin);
  const params = {
    client_id: globals.env.spotify.clientId,
    redirect_uri: redirectUrl.toString(),
    scope: 'playlist-modify-public playlist-read-private playlist-modify-private streaming user-read-email user-read-private',
    response_type: 'token'
  };

  for (const [key, value] of Object.entries(params)) {
    authorizeUrl.searchParams.append(key, value);
  }

  return authorizeUrl.toString();
}

export const connect = () => {
  window.location.href = authorizeEndpoint();
};

export const connectPlay = () => {
  window.location.href = authorizeEndpoint('play');
};

export const getUser = async ({ token }) => {
  const url = 'https://api.spotify.com/v1/me';
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  });
  if (res.status !== 200) {
    throw new Error();
  }
  return res.json();
};

export const getUserPlaylists = ({ token, userId }) => {
  const url = `https://api.spotify.com/v1/users/${userId}/playlists`;
  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
    .then(res => res.json());
};

export const loadSpotifySDK = (token, onStateChange) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = 'https://sdk.scdn.co/spotify-player.js';

    document.head.appendChild(script);

    window.onSpotifyWebPlaybackSDKReady = () => {
      player = new Spotify.Player({ name: 'HMS', getOAuthToken: cb => { cb(token); } });

      player.addListener('ready', ({ device_id }) => {
        resolve(player);
        playerId = device_id;
      });

      player.addListener('initialization_error', ({ message }) => { console.error(message); });
      player.addListener('authentication_error', ({ message }) => { console.error(message); });
      player.addListener('account_error', ({ message }) => { console.error(message); });
      player.addListener('playback_error', ({ message }) => { console.error(message); });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      player.connect();
    };
  });
};

export const play = async (uri, token) => {
  const state = await playerState();
  let currentUri = state &&  state.track_window.current_track.uri;
  if (!currentUri || currentUri !== uri) {
    return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${playerId}`, {
      method: 'PUT',
      body: JSON.stringify({ uris: [uri] }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    })
  }
  return player.resume();
};

export const pause = () => {
  return player.pause();
};

export const playerState = () => player.getCurrentState();
