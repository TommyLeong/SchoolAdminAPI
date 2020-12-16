import Sequelize from 'sequelize';
import sequelize from '../config/database';
import Class from './Class'

const Student = sequelize.define('Student',{
    uuid:{
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    name: Sequelize.STRING,
    email: Sequelize.STRING
  })

Student.hasMany(Class)

export default Student;