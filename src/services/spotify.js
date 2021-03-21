import globals from '../utils/globals';

const authorizeUrl = new URL('https://accounts.spotify.com/authorize');
const params = {
  client_id: globals.env.spotify.clientId,
  redirect_uri: window.location.href,
  scope: 'playlist-modify-public playlist-read-private playlist-modify-private',
  response_type: 'token'
};

for (const [key, value] of Object.entries(params)) {
  authorizeUrl.searchParams.append(key, value);
}

export const authorizeEndpoint = authorizeUrl.toString();


export const getUser = ({ token }) => {
  const url = 'https://api.spotify.com/v1/me';
  return fetch(url, {
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
    .then(res => res.json());
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
