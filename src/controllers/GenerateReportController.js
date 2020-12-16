import Express from 'express';
import { OK } from 'http-status-codes';
import Teacher from '../models/Teacher'
import Student from '../models/Student'
import Subject from '../models/Subject'
import Class from '../models/Class'

const GenerateReportController = Express.Router();

const generateReportHandler = async (req, res) => {
  const results = await Teacher.findAll({raw : true});
  console.log(results)

  const teachersName = []

  console.log(results.every(teacher => {
    teachersName.push(teacher.name)
    console.log(teacher)
  }));

  return res.sendStatus(200);
}

GenerateReportController.get('/reports/workload', generateReportHandler);

export default GenerateReportController;
