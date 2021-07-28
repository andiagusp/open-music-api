const {
  PlaylistsPayloadSchema,
  PlaylistSongsPayloadSchema
} = require('./PlaylistsSchema')
const InvariantError = require('../../exceptions/InvariantError')

const PlaylistsValidator = {
  playlistPostValidate: (payload) => {
    const { error } = PlaylistsPayloadSchema.validate(payload)
    if (error) throw new InvariantError(error.details[0].message)
  },
  playlistSongPostValidate: (payload) => {
    const { error } = PlaylistSongsPayloadSchema.validate(payload)
    if (error) throw new InvariantError(error.details[0].message)
  }
}

module.exports = PlaylistsValidator