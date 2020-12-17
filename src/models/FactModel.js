import Sequelize from 'sequelize';
import sequelize from '../config/database';

import Teacher from './Teacher'
import Student from './Student'
import Subject from './Subject'
import Class from './Class'

const FactModel = sequelize.define('FactModel',{
    uuid:{
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    teacherEmail: Sequelize.STRING,
    studentEmail: Sequelize.STRING,
    subjectCode: Sequelize.STRING,
    classCode: Sequelize.STRING
  })

module.exports = FactModel;