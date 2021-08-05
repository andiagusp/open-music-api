const ClientError = require('../../exceptions/ClientError')

class CollaborationsHandler {
  constructor (collaborationsService, playlistsService, validator) {
    this._validator = validator
    this._playlistsService = playlistsService
    this._collaborationsService = collaborationsService

    this.postCollaborationHandler = this.postCollaborationHandler.bind(this)
    this.deleteCollaborationHandler = this.deleteCollaborationHandler.bind(this)
  }

  async postCollaborationHandler (request, h) {
    try {
      this._validator.collaborationsPayloadValidate(request.payload)
      const { playlistId, userId } = request.payload
      const { id: owner } = request.auth.credentials

      await this._playlistsService.verifyPlaylistOwner(playlistId, owner)
      const collaborationId = await this._collaborationsService.addCollaborations(playlistId, userId)

      const response = h.response({
        status: 'success',
        message: 'Kolaborasi berhasil ditambahkan',
        data: { collaborationId }
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

  async deleteCollaborationHandler (request, h) {
    try {
      this._validator.collaborationsPayloadValidate(request.payload)
      const { playlistId, userId } = request.payload
      const { id: owner } = request.auth.credentials

      await this._playlistsService.verifyPlaylistOwner(playlistId, owner)
      await this._collaborationsService.deleteCollaboration(playlistId, userId)

      return ({
        status: 'success',
        message: 'Kolaborasi berhasil dihapus'
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

module.exports = CollaborationsHandler
