const InvariantError = require('../../exceptions/InvariantError')
const { CollaborationsPayloadSchema } = require('./CollaboratoinsSchema')

const CollaborationsValidator = {
  collaborationsPayloadValidate: (payload) => {
    const { error } = CollaborationsPayloadSchema.validate(payload)
    if (error) throw new InvariantError(error.details[0].message)
  }
}

module.exports = CollaborationsValidator
