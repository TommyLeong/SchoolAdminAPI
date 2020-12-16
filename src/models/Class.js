import Sequelize from 'sequelize';
import sequelize from '../config/database';

const Class = sequelize.define('Class',{
    uuid:{
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4
    },
    classCode: Sequelize.STRING,
    name: Sequelize.STRING
  })

export default Class;