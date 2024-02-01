const { sequelize } = require('./data-connections');
const { DataTypes } = require('./sequelize')

const Company = sequelize.define('company', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true

  },
  name:{
    type: DataTypes.STRING(64),
    allowNull:false

  },
  phone:{
    type: DataTypes.INTEGER,
    allowNull:false
  },
  email:{
    type:DataTypes.STRING(256),
    unique:true
  },
  year_founded:{
    type: DataTypes.INTEGER,
    allowNull:false
  },
  address:{
    type:DataTypes.STRING(256),
    unique:true
  }
});

module.exports = Company;