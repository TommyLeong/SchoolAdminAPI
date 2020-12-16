import Express from 'express';
import { OK } from 'http-status-codes';
import Teacher from '../models/Teacher'
import Student from '../models/Student'
import Subject from '../models/Subject'
import Class from '../models/Class'

const RegistrationController = Express.Router();

const checkEmptyOrInvalidType = (value,  type) => {
  if(value === undefined || value.length < 1 || typeof value !== type) return false;
  return true;
}

const registrationHandler = async (req, res) => {
  var body = req.body;
  // console.log(body);
  // console.log(req.method); // Return method type

  const sourceOfTruth = []

  // Validate teacher input
  sourceOfTruth.push(checkEmptyOrInvalidType(body.teacher.name, "string"));
  sourceOfTruth.push(checkEmptyOrInvalidType(body.teacher.email, "string"));

  // Validate studetns input
  if(body.students !== undefined){
    body.students.forEach(student => {
      sourceOfTruth.push(checkEmptyOrInvalidType(student.name, "string"));
      sourceOfTruth.push(checkEmptyOrInvalidType(student.email, "string"));
    });
  }

  // Validate subject input
  sourceOfTruth.push(checkEmptyOrInvalidType(body.subject.subjectCode, "string"));
  sourceOfTruth.push(checkEmptyOrInvalidType(body.subject.name, "string"));

  // Validate class input
  sourceOfTruth.push(checkEmptyOrInvalidType(body.class.classCode, "string"));
  sourceOfTruth.push(checkEmptyOrInvalidType(body.class.name, "string"));

  if(sourceOfTruth.includes(false)){
    return res.sendStatus(422);
  }else{
    Teacher.create({
      name: body.teacher.name,
      email: body.teacher.email
    })

    body.students.forEach(student => {
      if(student.name !== undefined && student.email !== undefined){
        Student.create({
          name: student.name,
          email: student.email,
        })
      }
    });

    Subject.create({
      subjectCode: body.subject.subjectCode,
      name: body.subject.name
    })

    Class.create({
      classCode: body.class.classCode,
      name: body.class.name
    })

    return res.sendStatus(204);
  }
}

RegistrationController.post('/register', registrationHandler);

export default RegistrationController;
