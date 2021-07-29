const {
  LoginAuthenticationSchema,
  UpdateDeleteTokenAuthenticationSchema
} = require('./AuthenticationsSchema')
const InvariantError = require('../../exceptions/InvariantError')

const AuthenticationsValidator = {
  loginAuthenticationValidate: (payload) => {
    const { error } = LoginAuthenticationSchema.validate(payload)
    if (error) throw new InvariantError(error.details[0].message)
  },
  updateTokenAuthenticationValidate: (payload) => {
    const { error } = UpdateDeleteTokenAuthenticationSchema.validate(payload)
    if (error) throw new InvariantError(error.details[0].message)
  },
  deleteTokenAuthenticationValidate: (payload) => {
    const { error } = UpdateDeleteTokenAuthenticationSchema.validate(payload)
    if (error) throw new InvariantError(error.details[0].message)
  }
}

module.exports = AuthenticationsValidator
