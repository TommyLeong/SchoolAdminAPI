import Sequelize from 'sequelize';
import sequelize from '../config/database';

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

module.exports = Class;