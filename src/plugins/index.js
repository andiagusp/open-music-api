const path = require('path')

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

const _exports = require('../api/exports')
const ExportValidator = require('../validator/exports')
const ProducerService = require('../services/rabbitmq/ProducerService')

const uploads = require('../api/uploads')
const UploadsValidator = require('../validator/uploads')
const UploadsService = require('../services/storage/UploadsService')

const TokenManager = require('../token/TokenManager')
const CacheService = require('../services/redis/CacheService')

const registerPlugin = () => {
  const plugins = []
  const cacheService = new CacheService()
  const songsService = new SongsService()
  const usersService = new UsersService()
  const playlistSongsService = new PlaylistSongsService(cacheService)
  const collaborationsService = new CollaborationsService(cacheService)
  const authenticationsService = new AuthenticationsService()
  const uploadsService = new UploadsService(path.resolve(__dirname, '../api/uploads/file/images'))
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
    },
    {
      plugin: _exports,
      options: {
        producerService: ProducerService,
        playlistsService,
        validator: ExportValidator
      }
    },
    {
      plugin: uploads,
      options: {
        service: uploadsService,
        validator: UploadsValidator
      }
    }
  )

  return plugins
}

const plugins = registerPlugin()

module.exports = plugins
