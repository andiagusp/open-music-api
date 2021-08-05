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

<<<<<<< HEAD
module.exports = PlaylistsValidator
=======
module.exports = PlaylistsValidator
>>>>>>> 831805842375aa6ef9d173b6d3c9be7bc5df7dab
