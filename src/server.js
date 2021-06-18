require('dotenv').config()
const Hapi = require('@hapi/hapi')
const SongsService = require('./services/postgres/SongsService')
const songs = require('./api/songs')

const init = async () => {
  const songsService = new SongsService()
  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register([
    {
      plugin: songs,
      options: {
        service: songsService
      }
    }
  ])

  await server.start()
  console.log('Server running on port %s', server.info.uri)
}

init()
