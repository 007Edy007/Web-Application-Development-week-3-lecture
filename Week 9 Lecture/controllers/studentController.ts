import { Request, Response } from "express";
import BetterSqlite3 from 'better-sqlite3';
import StudentDao from "../dao/studentDao";
import { error } from "node:console";

export default class StudentController {
    dao: StudentDao;

    constructor(db: BetterSqlite3.Database) {
        this.dao = new StudentDao(db, 'students');
    }

    findStudentById(req: Request, res: Response) {
        try {
            const student = this.dao.findStudentById(req.params.id as string);

            if (student === null) {
                res.status(404).json({error: 'No Student with that ID'})
            } else {
                res.json(student)
            }
        } catch(e) {
            res.status(500).json({ error: e })
        }
    }

    findStudentByCourse(req: Request, res: Response) {
        try {
            const students = this.dao.findStudentByCourse(req.params.course as string);
            res.json(students);
        } catch (e) {
            res.status(500).json({ error:e })
        }
    }

    addStudent(req: Request, res: Response) {
        try {
            const studentId = this.dao.addStudent(req.body.name, req.body.course);
            res.json({id: studentId});
        } catch (e) {
            res.status(500).json({ error:e })
        }
    }

    deleteStudent(req: Request, res: Response) {
        try {
            const changes = this.dao.deleteStudent(
                req.params.id as string);

            if (changes === 0) {
                res.status(404).json({error: 'No student deleted'});
            } else {
                res.json({success: true})
            }
        } catch (e) {
            res.status(500).json({ error:e })
        }
    }

}