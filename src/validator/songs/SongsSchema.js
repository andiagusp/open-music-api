const Joi = require('joi')

const SongsPayloadSchema = Joi.object({
  title: Joi.string().required(),
  year: Joi.number().integer().min(1800).max(2030).required(),
  performer: Joi.string().required(),
  genre: Joi.string(),
  duration: Joi.number()
})

module.exports = { SongsPayloadSchema }
