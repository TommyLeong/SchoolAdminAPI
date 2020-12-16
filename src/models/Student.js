import Sequelize from 'sequelize';
import sequelize from '../config/database';
import Class from './Class'

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

Student.hasMany(Class)


module.exports = Student;