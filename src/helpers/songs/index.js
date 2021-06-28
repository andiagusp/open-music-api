const mapSongKey = (song) => ({
  id: song.id,
  title: song.title,
  year: song.year,
  performer: song.performer,
  genre: song.genre,
  duration: song.duration,
  insertedAt: song.inserted_at,
  updatedAt: song.updated_at
})

const mapGetAllSong = (song) => ({
  id: song.id,
  title: song.title,
  performer: song.performer
})

module.exports = { mapSongKey, mapGetAllSong }
