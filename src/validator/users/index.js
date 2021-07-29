const UsersPayloadSchema = require('./UsersSchema')
const InvariantError = require('../../exceptions/InvariantError')

const UsersValidator = {
  userPostValidate: (payload) => {
    const { error } = UsersPayloadSchema.validate(payload)
    if (error) throw new InvariantError(error.details[0].message)
  }
}

module.exports = UsersValidator
