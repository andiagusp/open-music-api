const SongsHandler = require('./SongsHandler')
const routes = require('./routes')

module.exports = {
  name: 'songs',
  version: '1.0.0',
  register: async (server, { service, validate }) => {
    const songsHandler = new SongsHandler(service, validate)
    server.route(routes(songsHandler))
  }
}
