/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('songs', {
    id: {
      type: 'VARCHAR(64)',
      primaryKey: true
    },
    title: {
      type: 'VARCHAR(128)',
      notNull: true
    },
    year: {
      type: 'INTEGER',
      notNull: true
    },
    performer: {
      type: 'VARCHAR(64)',
      notNull: true
    },
    genre: {
      type: 'VARCHAR(64)',
      notNull: true
    },
    duration: {
      type: 'INTEGER',
      notNull: true
    },
    inserted_at: {
      type: 'TEXT',
      notNull: true
    },
    updated_at: {
      type: 'TEXT',
      notNull: true
    }
  })
};

exports.down = (pgm) => {
  pgm.dropTables('songs')
};
