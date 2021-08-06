const routes = require('./routes')
const UploadsHandler = require('./UploadsHandler')

const uploads = {
  name: 'uploads',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const uploadsHandler = new UploadsHandler(service, validator)
    server.route(routes(uploadsHandler))
  }
}

module.exports = uploads
