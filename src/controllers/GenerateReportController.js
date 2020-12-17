import Express from 'express';
import { OK } from 'http-status-codes';
import FactModel from '../models/FactModel'
import Teacher from '../models/Teacher'
import Student from '../models/Student'
import Subject from '../models/Subject'
import Class from '../models/Class'

const GenerateReportController = Express.Router();

const generateReportHandler = async (req, res) => {
  let finalResult = {}
  let workdone = 0;

  await Teacher.findAll({raw : true})
  .then((teachers)=>{
    teachers.map(async teacher=>{
      await FactModel.findAll({
        where:{
          teacherEmail: teacher.email
        },
        raw:true
      }).then(results=>{

        // Gather all emails
        let allEmails = [];    
        results.filter(result=>allEmails.includes(result.teacherEmail) ? false : allEmails.push(result.teacherEmail))

        // Loop through based on email
        allEmails.forEach(item=>{
          let continueRunning = false;

          let teacherEmail;
          const summary = []
          let checkBefore = []

          results.map(result=>{
            let records = []
            
            let appendCheckBeforeObj = {}
            appendCheckBeforeObj['subjectCode'] = result.subjectCode
            appendCheckBeforeObj['classCode'] = result.classCode
            
            // Only perform checking if the email is same (Check email by email)
            if(item === result.teacherEmail){
              continueRunning = true;
              teacherEmail = result.teacherEmail;
          
              let obj2 = {}
              obj2['classCode'] = result.classCode
              obj2['subjectCode'] = result.subjectCode
            
              // 
              if(records.some(record => record.classCode === result.classCode && record.subjectCode === result.subjectCode)){
                // do nothing
              }else{
                records.push(obj2); 
              }
              
              // If the record has been checked before, we skip. Otherwise we proceed to Line 66
              if(checkBefore.some(record => record.subjectCode === result.subjectCode &&  record.classCode === result.classCode)){
                continueRunning = false;
              }else{
                checkBefore.push(appendCheckBeforeObj)
              }
              
                if(continueRunning){
                  records.map(record=>{

                      let obj = {}
                      obj['subjectCode'] = record.subjectCode
                      obj['numberOfClasses'] = (obj['numberOfClasses'] || 0) + 1
                
                      // Check if item exist in summary array before. If yes, update the existing value by 1, otherwise append new item into array.
                      if(summary.some(item => item.subjectCode === record.subjectCode)){
                        summary.filter(item=>{
                          if(item.subjectCode === record.subjectCode) item.numberOfClasses = (item.numberOfClasses||0)+1
                        })
                      }else{
                        summary.push(obj)
                      }
                  })
                }
            }
          })
          
          finalResult[teacherEmail] = summary;
          workdone += 1;
        })
      })
      console.log(finalResult);
      if(workdone === 2) return res.status(200).json(finalResult);
    })
  })
  .catch(err => console.log(err))
}

GenerateReportController.get('/reports/workload', generateReportHandler);

export default GenerateReportController;
