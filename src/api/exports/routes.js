const routes = (handler) => [
  {
    method: 'POST',
    path: '/exports/playlists/{playlistId}',
    handler: handler.exportPlaylistsHandler,
    options: {
      auth: 'music_jwt'
    }
  }
]

module.exports = routes
