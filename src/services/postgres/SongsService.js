const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const { mapSongKey, mapGetAllSong } = require('../../helpers/songs')
const NotFoundError = require('../../exceptions/NotFoundError')
const InvariantError = require('../../exceptions/InvariantError')

class SongsService {
  constructor () {
    this._pool = new Pool()
  }

  async getSongs () {
    const result = await this._pool.query('SELECT * FROM songs')
    return result.rows.map(mapGetAllSong)
  }

  async addSong ({ title, year, performer, genre, duration }) {
    const id = `song-${nanoid(16)}`
    const insertedAt = new Date().toISOString()
    const updatedAt = new Date().toISOString()
    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
      values: [id, title, year, performer, genre, duration, insertedAt, updatedAt]
    }
    const result = await this._pool.query(query)
    if (!result.rows[0].id) {
      throw new InvariantError('Lagu gagal ditambahkan')
    }
    return result.rows[0].id
  }

  async getSongDetail (id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id]
    }
    const result = await this._pool.query(query)
    if (!result.rows[0]) {
      throw new NotFoundError('Lagu tidak ditemukan')
    }
    return result.rows.map(mapSongKey)[0]
  }

  async editSong (id, { title, year, performer, genre, duration }) {
    const updatedAt = new Date().toISOString()
    const query = {
      text: 'UPDATE songs SET title=$1, year=$2, performer=$3, genre=$4, duration=$5, updated_at=$6 WHERE id=$7 RETURNING id',
      values: [title, year, performer, genre, duration, updatedAt, id]
    }
    const result = await this._pool.query(query)
    if (!result.rows[0]) {
      throw new NotFoundError('lagu tidak ditemukan')
    }
  }

  async deleteSong (id) {
    const query = {
      text: 'DELETE FROM songs WHERE id=$1 RETURNING id',
      values: [id]
    }
    const result = await this._pool.query(query)
    if (!result.rows[0]) {
      throw new NotFoundError('lagu tidak ditemukan')
    }
  }
}

module.exports = SongsService
