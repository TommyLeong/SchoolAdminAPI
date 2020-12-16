import Sequelize from 'sequelize';
import sequelize from '../config/database';

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

  module.exports = Subject;