const { SongsPayloadSchema } = require('./SongsSchema')
const InvariantError = require('../../exceptions/InvariantError')

const SongsValidator = {
  songPostValidate: (payload) => {
    const { error } = SongsPayloadSchema.validate(payload)
    if (error) {
      throw new InvariantError(error.details[0].message)
    }
  }
}

module.exports = SongsValidator
