const ClientError = require('../../exceptions/ClientError')

class UsersHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    this.postUserHandler = this.postUserHandler.bind(this)
  }

  async postUserHandler (request, h) {
    try {
      const { payload } = request
      this._validator.userPostValidate(payload)
      const userId = await this._service.addUser(payload)

      const response = h.response({
        status: 'success',
        message: 'User berhasil ditambahkan',
        data: { userId }
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
        status: 'fail',
        message: error.message
      })
      response.code(500)
      return response
    }
  }
}

module.exports = UsersHandler
