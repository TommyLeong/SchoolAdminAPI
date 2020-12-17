import Express from 'express';
import { OK } from 'http-status-codes';
import Teacher from '../models/Teacher'
import Student from '../models/Student'
import Subject from '../models/Subject'
import Class from '../models/Class'
import FactModel from '../models/FactModel'

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
    return res.sendStatus(400);
  }else{
    /**
     * Input Teacher Model
     */
    await Teacher.findOne({
      where:{
        email: body.teacher.email
      }
    }).then(async(result)=>{
      if(result){
        await Teacher.update({ name: body.teacher.name, }, {
          where: {
            email: body.teacher.email
          }
        });
      }else{
        await Teacher.create({
          name: body.teacher.name,
          email: body.teacher.email
        })
      }
    }).catch(err=>console.log(err))

    /**
     * Input Student Model
     */
    body.students.forEach(async student => {
      if(student.name !== undefined && student.email !== undefined){
        await Student.findOne({
          where:{
            email: student.email
          }
        }).then(async(result)=>{
          if(result){
            await Student.update({ name: student.name, }, {
              where: {
                email: student.email
              }
            });
          }else{
            await Student.create({
              name: student.name,
              email: student.email
            })
          }
        }).catch(err=>console.log(err))
      }

      /**
       * Input Fact Model
       */
      FactModel.create({
        teacherEmail: body.teacher.email,
        studentEmail: student.email,
        classCode: body.class.classCode,
        subjectCode: body.subject.subjectCode,
      }).catch(err=>{
        console.log(err)
      })
    });

    /**
     * Input Subject Model
     */
    await Subject.findOne({
      where:{
        subjectCode: body.subject.subjectCode
      }
    }).then(async(result)=>{
      if(result){
        await Subject.update({ name: body.subject.name, }, {
          where: {
            subjectCode: body.subject.subjectCode
          }
        });
      }else{
        Subject.create({
          subjectCode: body.subject.subjectCode,
          name: body.subject.name,
        })
      }
    }).catch(err=>console.log(err))

    /**
     * Input Class Model
     */
    await Class.findOne({
      where:{
        classCode: body.class.classCode,
      }
    }).then(async(result)=>{
      if(result){
        await Class.update({ name: body.class.name, }, {
          where: {
            classCode: body.class.classCode,
          }
        });
      }else{
        Class.create({
          classCode: body.class.classCode, 
          name: body.class.name,
        })
      }
    }).catch(err=>console.log(err))

    return res.sendStatus(204);
  }
}

RegistrationController.post('/register', registrationHandler);

export default RegistrationController;
