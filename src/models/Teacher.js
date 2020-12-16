import Sequelize from 'sequelize';
import sequelize from '../config/database';
import Class from './Class'
import Subject from './Subject'

const Teacher = sequelize.define('Teacher',{
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

Teacher.hasMany(Class)
Teacher.hasMany(Subject)

module.exports = Teacher;