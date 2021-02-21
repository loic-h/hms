const connect = () => fetch('/api/connect')
    .then(res => res.json())
    .then(res => {
      if (res.status !== 'ok') {
        throw new Error(res.message);
      }
      return res.body;
    });

const search = ({ query, token, type }) => {
  const url = new URL('/api/search', window.location.origin);
  url.searchParams.append('q', query);
  url.searchParams.append('type', type);
  return fetch(url)
    .then(res => res.json())
    .then(res => {
      if (res.status !== 'ok') {
        throw new Error(res.message);
      }
      return res.body;
    });
};

const playlist = ({ id }) => fetch(`/api/playlists/${id}`)
  .then(res => res.json())
  .then(res => {
    if (res.status !== 'ok') {
      throw new Error(res.message);
    }
    return res.body;
  });

export default {
  connect,
  search,
  playlist
};
