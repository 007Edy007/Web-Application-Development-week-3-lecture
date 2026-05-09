import Database from 'better-sqlite3';

const db = new Database('students.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    course TEXT NOT NULL
  )
`);

// Check whether table already has data
const countStmt = db.prepare('SELECT COUNT(*) as count FROM students');
const row = countStmt.get() as { count: number };

if (row.count === 0) {
  const insertStmt = db.prepare('INSERT INTO students (name, course) VALUES (?, ?)');

  insertStmt.run('Alex', 'Computing');
  insertStmt.run('Sara', 'Networking');
  insertStmt.run('Bob', 'Web Development');
}

export default db;