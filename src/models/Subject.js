import Sequelize from 'sequelize';
import sequelize from '../config/database';

const Subject = sequelize.define('Subject',{
    uuid:{
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    subjectCode: Sequelize.STRING,
    name: Sequelize.STRING
  })

  module.exports = Subject;