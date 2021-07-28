const ClientError = require('../../exceptions/ClientError')

class SongsHandler {
  constructor (service, validator) {
    this._service = service
    this._validator = validator

    this.getSongsHandler = this.getSongsHandler.bind(this)
    this.postSongHandler = this.postSongHandler.bind(this)
    this.editSongHandler = this.editSongHandler.bind(this)
    this.deleteSongHandler = this.deleteSongHandler.bind(this)
    this.getSongDetailHandler = this.getSongDetailHandler.bind(this)
  }

  async getSongsHandler (request, h) {
    try {
      const result = await this._service.getSongs()
      return {
        status: 'success',
        data: {
          songs: result
        }
      }
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

  async postSongHandler (request, h) {
    try {
      const { payload } = request
      this._validator.songPostValidate(payload)
      const songId = await this._service.addSong(payload)

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan',
        data: {
          songId
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

  async getSongDetailHandler (request, h) {
    try {
      const { id } = request.params
      const result = await this._service.getSongDetail(id)
      const response = h.response({
        status: 'success',
        data: {
          song: result
        }
      })
      response.code(200)
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

  async editSongHandler (request, h) {
    try {
      const { id } = request.params
      const { payload } = request
      this._validator.songPostValidate(payload)
      await this._service.editSong(id, payload)

      return {
        status: 'success',
        message: 'lagu berhasil diperbarui'
      }
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

  async deleteSongHandler (request, h) {
    try {
      const { id } = request.params
      await this._service.deleteSong(id)
      return {
        status: 'success',
        message: 'lagu berhasil dihapus'
      }
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

module.exports = SongsHandler
