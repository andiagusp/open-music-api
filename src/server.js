require('dotenv').config()
const Jwt = require('@hapi/jwt')
const Hapi = require('@hapi/hapi')

const songs = require('./api/songs')
const SongsValidator = require('./validator/songs')
const SongsService = require('./services/postgres/SongsService')

const users = require('./api/users')
const UsersValidator = require('./validator/users')
const UsersService = require('./services/postgres/UsersService')

const authentications = require('./api/authentications')
const AuthenticationsValidator = require('./validator/authentications')
const AuthenticationsService = require('./services/postgres/AuthenticationsService')

const playlists = require('./api/playlists')
const PlaylistsValidator = require('./validator/playlists')
const PlaylistsService = require('./services/postgres/PlaylistsService')
const PlaylistSongsService = require('./services/postgres/PlaylistSongsService')

const TokenManager = require('./token/TokenManager')

const init = async () => {
  const songsService = new SongsService()
  const usersService = new UsersService()
  const playlistsService = new PlaylistsService()
  const playlistSongsService = new PlaylistSongsService()
  const authenticationsService = new AuthenticationsService()

  const server = Hapi.server({
    port: process.env.PORT || 5000,
    host: process.env.HOST || 'localhost',
    routes: {
      cors: {
        origin: ['*']
      }
    }
  })

  await server.register([{ plugin: Jwt }])

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

  await server.register([
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator
      }
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator
      }
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        songsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator
      }
    },
    {
      plugin: playlists,
      options: {
        playlistsService,
        songsService,
        playlistSongsService,
        validator: PlaylistsValidator
      }
    }
  ])

  await server.start()
  console.log('Server running on port %s', server.info.uri)
}

init()
