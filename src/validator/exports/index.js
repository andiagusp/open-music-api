const { ExportPayloadSchema } = require('./ExportSchema')
const InvariantError = require('../../exceptions/InvariantError')

const ExportValidator = {
  postExportValidate: (payload) => {
    const { error } = ExportPayloadSchema.validate(payload)
    if (error) throw new InvariantError(error.details[0].message)
  }
}

module.exports = ExportValidator
