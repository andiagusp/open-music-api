const { nanoid } = require('nanoid')
const { Pool } = require('pg')
const InvariantError = require('../../exceptions/InvariantError')
const NotFoundError = require('../../exceptions/NotFoundError')

class CollaborationsService {
  constructor () {
    this._pool = new Pool()
  }

  async addCollaborations (pid, uid) {
    const id = `collaboration-${nanoid(16)}`
    const query = {
      text: 'INSERT INTO collaborations VALUES ($1, $2, $3) RETURNING id',
      values: [id, pid, uid]
    }
    const result = await this._pool.query(query)
    if (!result.rowCount) throw new InvariantError('Kolaborasi gagal ditambahkan')

    return result.rows[0].id
  }

  async deleteCollaboration (pid, uid) {
    const query = {
      text: 'DELETE FROM collaborations WHERE playlist_id=$1 AND user_id=$2 RETURNING id',
      values: [pid, uid]
    }
    const result = await this._pool.query(query)
    if (!result.rowCount) throw new InvariantError('Kolaborasi gagal dihapus')
  }

  async verifyPlaylistCollaborator (pid, uid) {
    const query = {
      text: 'SELECT * FROM collaborations WHERE playlist_id=$1 AND user_id=$2',
      values: [pid, uid]
    }
    const result = await this._pool.query(query)
    if (!result.rowCount) throw new NotFoundError('Kolaborasi tidak ditemukan')
  }
}

module.exports = CollaborationsService
