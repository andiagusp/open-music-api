require('dotenv').config()
const Jwt = require('@hapi/jwt')
const Hapi = require('@hapi/hapi')
const Inert = require('@hapi/inert')

const plugins = require('./plugins')

const init = async () => {
  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register([
    { plugin: Jwt },
    { plugin: Inert }
  ])

  server.auth.strategy('music_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id
      }
    })
  })

  await server.register(plugins)

  await server.start()
  console.log('Server running on port %s', server.info.uri)
}

init()
