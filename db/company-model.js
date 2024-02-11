const { sequelize } = require('./data-connections');
const Properties = require('./property-model');
const Agents = require('./agent-model');
const Address = require('./address-model');
const { DataTypes } = require('sequelize')


const Companies = sequelize.define('companies', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true

  },
  //creates the name column for the company table
  name: {
    type: DataTypes.STRING(64),
    allowNull: false

  },
  //creates the phone column for the company table
  phone: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  //creates the email column for the company table
  email: {
    type: DataTypes.STRING(256),
    validate: {
      isEmail: true
    },
    unique: true,
    allowNull: false
  },
  //creates the year_founded column for the company table
  year_founded: {
    type: DataTypes.STRING(4),
    allowNull: false
  }
});

//connects company and address models
//Agents has a one to one relationship with properties
Address.hasOne(Companies);
Companies.belongsTo(Address);

//connects company and agent models
//company has a one to many relationship with agents
Companies.hasMany(Agents);
Agents.belongsTo(Companies);

//connects company and properties models
//company has a one to many relationship with properties
Companies.hasMany(Properties);
Properties.belongsTo(Companies);

//exports company model
module.exports = Companies;