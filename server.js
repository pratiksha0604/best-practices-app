require('dotenv').config();
const db = require('./src/config/database');
const app = require('./src/app');

const tables = db
  .prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'")
  .all()
  .map((t) => t.name);
console.log('Database tables:', tables.join(', '));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));