import BetterSqlite3 from 'better-sqlite3';
import Student from '../models/student';

export default class StudentDao {
    db: BetterSqlite3.Database;
    table: string;

    constructor(db: BetterSqlite3.Database, table: string) {
        this.db = db;
        this.table = table
    }

    findStudentById(id: string): Student | null {
        const stmt = this.db.prepare(`SELECT * FROM ${this.table} WHERE id = ?`);
        const row = stmt.get(id);

        if(!row) {
            return null;
        }

        return row as Student
    }

    findStudentByCourse(course: string): Student[] {
        const stmt = this.db.prepare(`SELECT * FROM ${this.table} WHERE course = ?`);
        const rows = stmt.all(course);
        return rows as Student[]
    }

    addStudent(name: string, course: string): number {
        const stmt = this.db.prepare(`INSERT INTO ${this.table} (name, course) VALUES (?, ?)`);
        const info = stmt.run(name, course);
        return info.lastInsertRowid as number
    }

    

    deleteStudent(id: string): number {
        const stmt = this.db.prepare(`DELETE FROM ${this.table} WHERE id = ?`);
        const info = stmt.run(id);
        return info.changes;
    }
}