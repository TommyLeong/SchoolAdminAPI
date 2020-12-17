import Sequelize from 'sequelize';
import sequelize from '../config/database';
import Class from './Class'
import FactModel from './FactModel'
import Subject from './Subject';
import Teacher from './Teacher';

const Student = sequelize.define('Student',{
    uuid:{
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    name: Sequelize.STRING,
    email: {
      type: Sequelize.STRING,
      primaryKey: true,
    }
  })

// Student.hasMany(Class)
// Student.belongsToMany(Class, { through:FactModel })
// Student.belongsToMany(Teacher, { through:FactModel })
// Student.belongsToMany(Subject, { through:FactModel })


module.exports = Student;