import Sequelize from 'sequelize';
import sequelize from '../config/database';
import FactModel from './FactModel';
import Student from './Student';
import Class from './Class';
import Teacher from './Teacher';

const Subject = sequelize.define('Subject',{
    uuid:{
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    subjectCode: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: Sequelize.STRING
  })

// Subject.belongsToMany(Student, { through:FactModel })
// Subject.belongsToMany(Teacher, { through:FactModel })
// Subject.belongsToMany(Class, { through:FactModel })

  module.exports = Subject;