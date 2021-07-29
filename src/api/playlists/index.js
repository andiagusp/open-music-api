const PlaylistsHandler = require('./PlaylistsHandler')
const routes = require('./routes')

const playlists = {
  name: 'playlists',
  version: '1.0.0',
  register: async (server, { playlistsService, songsService, playlistSongsService, validator }) => {
    const playlistsHandler = new PlaylistsHandler(
      playlistsService, songsService, playlistSongsService, validator
    )
    server.route(routes(playlistsHandler))
  }
}

module.exports = playlists
