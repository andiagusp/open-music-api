class SongsHandler {
  constructor (service) {
    this._service = service
    this.getSongs = this.getSongs.bind(this)
  }

  async getSongs() {
    const result = await this._service.getSongs()
    return {
      status: 'success',
      data: {
        songs: result
      }
    }
  }
}

module.exports = SongsHandler
