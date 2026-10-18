const db = require('../config/database');

const find = (id) => db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);

module.exports = {
  find,
  all: () => db.prepare('SELECT * FROM tasks ORDER BY id').all(),
  create: ({ user_id, title, description, status }) => {
    const result = db
      .prepare(
        'INSERT INTO tasks (user_id, title, description, status) VALUES (?, ?, ?, ?)'
      )
      .run(user_id, title, description, status);
    return find(Number(result.lastInsertRowid));
  },
  update: (id, { title, description, status }) => {
    db.prepare(
      'UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ?'
    ).run(title, description, status, id);
    return find(id);
  },
  remove: (id) => db.prepare('DELETE FROM tasks WHERE id = ?').run(id),
};