const InvariantError = require('../../exceptions/InvariantError')
const { UploadsPayloadSchema } = require('./UploadsSchema')

const UploadsValidator = {
  postUploadPictureValidate: (headers) => {
    const { error } = UploadsPayloadSchema.validate(headers)
    if (error) throw new InvariantError(error.details[0].message)
  }
}

module.exports = UploadsValidator
