const { Pool } = require('pg')

class SongsService {
  constructor () {
    this._pool = new Pool()
  }

  async getSongs() {
    const result = await this._pool.query('SELECT * FROM songs')
    return result.rows
  }
}

module.exports = SongsService
