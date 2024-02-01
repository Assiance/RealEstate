const { DataTypes } = require('sequelize');
const sequelize = require('./data-connections');
const Properties = require('./property-model');

//creates the Agent table 
const Agents = sequelize.define('agents', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  first_name: {
    type: DataTypes.STRING(64),
    allowNull: true
  },
  last_name: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  city: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  years_experience: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  about: {
    type: DataTypes.STRING(1024),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(64),
    validate: {
      isEmail: true
    },
    unique: true
  }
});

//connects Agent and Property tables
//Agents has a one to many relationship with properties
Agents.hasMany(Properties);
Properties.belongsTo(Agents);

//exports the Agent file
module.exports = Agents;