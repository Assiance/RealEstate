const { sequelize } = require('./data-connections');
const Properties = require('./property-model');
const Agents = require('./agent-model');
const Address = require('./address-model');
const { DataTypes } = require('./sequelize')

const Company = sequelize.define('company', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true

  },
  name: {
    type: DataTypes.STRING(64),
    allowNull: false

  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(256),
    validate: {
      isEmail: true
    },
    unique: true
  },
  year_founded: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  address: {
    type: DataTypes.STRING(256),
    unique: true
  }
});

//connects company and address models
//Agents has a one to one relationship with properties
Company.hasOne(Address);

//connects company and agent models
//company has a one to many relationship with agents
Company.hasMany(Agents);
Agents.belongsTo(Company);

//connects company and properties models
//company has a one to many relationship with properties
Company.hasMany(Properties);
Properties.belongsTo(Company);

//exports company model
module.exports = Company;