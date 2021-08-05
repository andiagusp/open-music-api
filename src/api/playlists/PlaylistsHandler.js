const ClientError = require('../../exceptions/ClientError')

class PlaylistsHandler {
  constructor (playlistsService, songsService, playlistSongsService, validator) {
    this._validator = validator
    this._songsService = songsService
    this._playlistsService = playlistsService
    this._playlistSongsService = playlistSongsService

    this.getPlaylistsHandler = this.getPlaylistsHandler.bind(this)
    this.postPlaylistHandler = this.postPlaylistHandler.bind(this)
    this.deletePlaylistHandler = this.deletePlaylistHandler.bind(this)
    this.addSongToPlaylistHandler = this.addSongToPlaylistHandler.bind(this)
    this.getSongsFromPlaylistHandler = this.getSongsFromPlaylistHandler.bind(this)
    this.deleteSongFromPlaylistHandler = this.deleteSongFromPlaylistHandler.bind(this)
  }

  async postPlaylistHandler (request, h) {
    try {
      this._validator.playlistPostValidate(request.payload)
      const { payload: { name } } = request
      const { id: owner } = request.auth.credentials

      const id = await this._playlistsService.addPlaylist({ name, owner })
      const response = h.response({
        status: 'success',
        message: 'Playlist berhasil ditambahkan',
        data: {
          playlistId: id
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

  async getPlaylistsHandler (request, h) {
    try {
      const { id } = request.auth.credentials
      const playlists = await this._playlistsService.getPlaylists(id)

      return ({
        status: 'success',
        data: {
          playlists
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

  async deletePlaylistHandler (request, h) {
    try {
      const { playlistId } = request.params
      const { id: owner } = request.auth.credentials

<<<<<<< HEAD
      await this._playlistsService.verifyPlaylistAccess(playlistId, owner)
=======
      await this._playlistsService.verifyPlaylistOwner(playlistId, owner)
>>>>>>> 831805842375aa6ef9d173b6d3c9be7bc5df7dab
      await this._playlistsService.deletePlaylist(playlistId)

      return ({
        status: 'success',
        message: 'Playlist berhasil dihapus'
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

  async addSongToPlaylistHandler (request, h) {
    try {
      this._validator.playlistSongPostValidate(request.payload)
      const { playlistId } = request.params
      const { songId } = request.payload
      const { id: owner } = request.auth.credentials

      await this._playlistsService.verifyPlaylistAccess(playlistId, owner)
      await this._songsService.verifySong(songId)
      await this._playlistSongsService.addSongToPlaylist(playlistId, songId)

      const response = h.response({
        status: 'success',
        message: 'Lagu berhasil ditambahkan ke playlist'
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

  async getSongsFromPlaylistHandler (request, h) {
    try {
      const { playlistId } = request.params
      const { id: owner } = request.auth.credentials

      await this._playlistsService.verifyPlaylistAccess(playlistId, owner)
<<<<<<< HEAD
      const songs = await this._playlistSongsService.getPlaylistSongs(playlistId, owner)
=======
      const songs = await this._playlistSongsService.getSongFromPlaylist(playlistId, owner)
>>>>>>> 831805842375aa6ef9d173b6d3c9be7bc5df7dab

      return ({
        status: 'success',
        data: { songs }
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

  async deleteSongFromPlaylistHandler (request, h) {
    try {
      this._validator.playlistSongPostValidate(request.payload)
      const { playlistId } = request.params
      const { songId } = request.payload
      const { id: owner } = request.auth.credentials

      await this._playlistsService.verifyPlaylistAccess(playlistId, owner)
      await this._songsService.verifySong(songId)
      await this._playlistSongsService.deleteSongFromPlaylist(playlistId, songId)

      return ({
        status: 'success',
        message: 'Lagu berhasil dihapus dari playlist'
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

module.exports = PlaylistsHandler
