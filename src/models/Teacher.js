import Sequelize from 'sequelize';
import sequelize from '../config/database';
import Class from './Class'
import Subject from './Subject'
import Student from './Student'
import FactModel from './FactModel'

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

// Teacher.hasMany(Class)
// Teacher.hasMany(Subject)
// Teacher.belongsToMany(Student, { through:FactModel })
// Teacher.belongsToMany(Class, { through:FactModel })
// Teacher.belongsToMany(Subject, { through:FactModel })

module.exports = Teacher;