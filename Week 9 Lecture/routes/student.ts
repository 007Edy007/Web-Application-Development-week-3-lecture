import express from 'express';
import db from '../db';
import StudentController from '../controllers/studentController';

const studentRouter = express.Router();
const sController = new StudentController(db)

studentRouter.get('/id/:id', sController.findStudentById.bind(sController));
studentRouter.get('/course/:course', sController.findStudentByCourse.bind(sController));
studentRouter.post('/create', sController.addStudent.bind(sController))
studentRouter.delete('/id/:id', sController.deleteStudent.bind(sController));


export default studentRouter;