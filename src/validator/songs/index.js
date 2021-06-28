const SongPayloadSchema = require('./songschema')
const InvariantError = require('../../exceptions/InvariantError')

const SongsValidate = {
  songValidateSchema: (payload) => {
    const { error } = SongPayloadSchema.validate(payload)
    if (error) {
      throw new InvariantError(error.details[0].message)
    }
  }
}

module.exports = SongsValidate
