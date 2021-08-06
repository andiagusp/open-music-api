const ClientError = require('../../exceptions/ClientError')

class ExportHandler {
  constructor (producerService, playlistsService, validator) {
    this._validator = validator
    this._producerService = producerService
    this._playlistsService = playlistsService

    this.exportPlaylistsHandler = this.exportPlaylistsHandler.bind(this)
  }

  async exportPlaylistsHandler (request, h) {
    try {
      this._validator.postExportValidate(request.payload)
      const { id: userId } = request.auth.credentials
      const { playlistId } = request.params
      await this._playlistsService.verifyPlaylistAccess(playlistId, userId)
      const message = {
        userId,
        targetEmail: request.payload.targetEmail
      }
      await this._producerService.sendMessage('export:playlists', JSON.stringify(message))

      const response = h.response({
        status: 'success',
        message: 'Permintaan Anda sedang kami proses'
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

module.exports = ExportHandler
