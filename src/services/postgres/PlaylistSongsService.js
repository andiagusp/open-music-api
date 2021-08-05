const { Pool } = require('pg')
const { nanoid } = require('nanoid')
const InvariantError = require('../../exceptions/InvariantError')

class PlaylistSongsService {
  constructor () {
    this._pool = new Pool()
  }

  async addSongToPlaylist (pid, sid) {
    const id = `playlistsong-${nanoid(16)}`
    const query = {
      text: 'INSERT INTO playlistsongs VALUES ($1, $2, $3) RETURNING id',
      values: [id, pid, sid]
    }
    const result = await this._pool.query(query)
    if (!result.rowCount) throw new InvariantError('Data gagal ditambahkan')
  }

  async getSongFromPlaylist (pid, owner) {
    const query = {
      text: `
        SELECT songs.id, songs.title, songs.performer
        FROM songs
        LEFT JOIN playlistsongs
        ON playlistsongs.song_id = songs.id
        LEFT JOIN playlists
        ON playlistsongs.playlist_id = playlists.id
        LEFT JOIN collaborations
        ON collaborations.user_id = $2
        WHERE playlistsongs.playlist_id = $1
        AND (playlists.owner = $2 OR collaborations.user_id = $2)
      `,
      values: [pid, owner]
    }
    const result = await this._pool.query(query)
    return result.rows
  }

  async deleteSongFromPlaylist (pid, sid) {
    const query = {
      text: 'DELETE FROM playlistsongs WHERE playlist_id=$1 AND song_id = $2 RETURNING id',
      values: [pid, sid]
    }
    const result = await this._pool.query(query)
    if (!result.rowCount) throw new InvariantError('Lagu gagl di hapus dari playlist')
  }
}

module.exports = PlaylistSongsService
