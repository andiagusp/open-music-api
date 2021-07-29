const Joi = require('joi')

const LoginAuthenticationSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
})

const UpdateDeleteTokenAuthenticationSchema = Joi.object({
  refreshToken: Joi.string().required()
})

module.exports = {
  LoginAuthenticationSchema,
  UpdateDeleteTokenAuthenticationSchema
}
