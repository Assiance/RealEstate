const { DataTypes } = require('sequelize');
const sequelize = require('./data-connections');
const Properties = require('./property-model');

//creates the Agent table 
const Agents = sequelize.define('agents', {
  //creates the ID column for the agents table
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  //creates the first name column for the agents table
  first_name: {
    type: DataTypes.STRING(64),
    allowNull: true
  },
  //creates the last name column for the agents table
  last_name: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  //creates the city column for the agents table
  city: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  //creates the state column for the agents table
  state: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  //creates the phone # column for the agents table
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  //creates the years of experience column for the agents table
  years_experience: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  //creates the about column for the agents table
  about: {
    type: DataTypes.STRING(1024),
    allowNull: false
  },
  //creates and validates the email column for the agents table
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