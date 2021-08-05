const songs = require('../api/songs')
const SongsValidator = require('../validator/songs')
const SongsService = require('../services/postgres/SongsService')

const users = require('../api/users')
const UsersValidator = require('../validator/users')
const UsersService = require('../services/postgres/UsersService')

const authentications = require('../api/authentications')
const AuthenticationsValidator = require('../validator/authentications')
const AuthenticationsService = require('../services/postgres/AuthenticationsService')

const playlists = require('../api/playlists')
const PlaylistsValidator = require('../validator/playlists')
const PlaylistsService = require('../services/postgres/PlaylistsService')
const PlaylistSongsService = require('../services/postgres/PlaylistSongsService')

const collaborations = require('../api/collaborations')
const CollaborationsValidator = require('../validator/collaborations')
const CollaborationsService = require('../services/postgres/CollaborationsService')

const TokenManager = require('../token/TokenManager')

const registerPlugin = () => {
  const plugins = []
  const songsService = new SongsService()
  const usersService = new UsersService()
  const playlistSongsService = new PlaylistSongsService()
  const collaborationsService = new CollaborationsService()
  const authenticationsService = new AuthenticationsService()
  const playlistsService = new PlaylistsService(collaborationsService)

  plugins.push(
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
    },
    {
      plugin: collaborations,
      options: {
        collaborationsService,
        playlistsService,
        validator: CollaborationsValidator
      }
    }
  )

  return plugins
}

const plugins = registerPlugin()

module.exports = plugins
