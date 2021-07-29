const ClientError = require('../../exceptions/ClientError')

class AuthenticationsHandler {
  constructor (authenticationsService, usersService, tokenManager, validator) {
    this._validator = validator
    this._tokenManager = tokenManager
    this._usersService = usersService
    this._authenticationsService = authenticationsService

    this.loginAuthenticationHandler = this.loginAuthenticationHandler.bind(this)
    this.updateTokenAuthenticationHandler = this.updateTokenAuthenticationHandler.bind(this)
    this.deleteTokenAuthenticationsHandler = this.deleteTokenAuthenticationsHandler.bind(this)
  }

  async loginAuthenticationHandler (request, h) {
    try {
      const { payload } = request
      this._validator.loginAuthenticationValidate(payload)
      const id = await this._usersService.loginUser(payload)

      const accessToken = this._tokenManager.generateAccessToken({ id })
      const refreshToken = this._tokenManager.generateRefreshToken({ id })
      await this._authenticationsService.addRefreshToken(refreshToken)

      const response = h.response({
        status: 'success',
        message: 'Authentication berhasil ditambahkan',
        data: {
          accessToken,
          refreshToken
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

  async updateTokenAuthenticationHandler (request, h) {
    try {
      this._validator.updateTokenAuthenticationValidate(request.payload)
      const { refreshToken } = request.payload
      await this._authenticationsService.verifyRefreshToken(refreshToken)

      const { id } = this._tokenManager.verifyRefreshToken(refreshToken)
      const accessToken = this._tokenManager.generateAccessToken({ id })

      return ({
        status: 'success',
        message: 'Authentication berhasil diperbarui',
        data: {
          accessToken
        }
      })
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

  async deleteTokenAuthenticationsHandler (request, h) {
    try {
      this._validator.deleteTokenAuthenticationValidate(request.payload)
      const { refreshToken } = request.payload

      await this._authenticationsService.verifyRefreshToken(refreshToken)
      await this._authenticationsService.deleteRefreshToken(refreshToken)

      return ({
        status: 'success',
        message: 'Refresh token berhasil dihapus'
      })
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

module.exports = AuthenticationsHandler
