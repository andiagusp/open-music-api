const ClientError = require('../../exceptions/ClientError')

class UploadsHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    this.uploadPictureHandler = this.uploadPictureHandler.bind(this)
  }

  async uploadPictureHandler (request, h) {
    try {
      const { data } = request.payload
      this._validator.postUploadPictureValidate(data.hapi.headers)
      const filename = await this._service.writeFile(data, data.hapi)

      const response = h.response({
        status: 'success',
        message: 'Gambar berhasil diunggah',
        data: {
          pictureUrl: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`
        }
      })
      response.code(201)
      return response
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message
        })
        response.code(error.statusCode)
        return response
      }
      console.log(error)
      const response = h.response({
        status: 'error',
        message: error.message
      })
      response.code(500)
      return response
    }
  }
}

module.exports = UploadsHandler
