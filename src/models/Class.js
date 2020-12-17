import Sequelize from 'sequelize';
import sequelize from '../config/database';
import Student from './Student'
import Teacher from './Teacher'
import Subject from './Subject'
import FactModel from './FactModel'

const Class = sequelize.define('Class',{
    uuid:{
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4
    },
    classCode: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    name: Sequelize.STRING
  })

// Class.belongsToMany(Student, { through:FactModel })
// Class.belongsToMany(Teacher, { through:FactModel })
// Class.belongsToMany(Subject, { through:FactModel })

module.exports = Class;