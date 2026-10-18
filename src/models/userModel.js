const db = require('../config/database');

const find = (id) => db.prepare('SELECT * FROM users WHERE id = ?').get(id);

module.exports = {
  find,
  all: () => db.prepare('SELECT * FROM users ORDER BY id').all(),
  create: ({ name, email }) => {
    const result = db
      .prepare('INSERT INTO users (name, email) VALUES (?, ?)')
      .run(name, email);
    return find(Number(result.lastInsertRowid));
  },
};