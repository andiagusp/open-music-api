const routes = require('./routes')
const AuthenticationsHandler = require('./AuthenticationsHandler')

const authentications = {
  name: 'authentications',
  version: '1.0.0',
  register: async (server, { authenticationsService, usersService, tokenManager, validator }) => {
    const authenticationsHandler = new AuthenticationsHandler(
      authenticationsService, usersService, tokenManager, validator
    )
    server.route(routes(authenticationsHandler))
  }
}

module.exports = authentications
