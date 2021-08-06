const routes = require('./routes')
const ExportHandler = require('./ExportHandler')

const _exports = {
  name: 'exports',
  version: '1.0.0',
  register: async (server, { producerService, playlistsService, validator }) => {
    const exportHandler = new ExportHandler(producerService, playlistsService, validator)
    server.route(routes(exportHandler))
  }
}

module.exports = _exports
