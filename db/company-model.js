const { sequelize } = require('./data-connections');
const Properties = require('./property-model');
const Agents = require('./agent-model');
const Address = require('./address-model');
const { DataTypes } = require('./sequelize')


const Company = sequelize.define('company', {
  //creates the ID column for the company table
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
    type: DataTypes.INTEGER,
    allowNull: false
  },
  //creates the email column for the company table
  email: {
    type: DataTypes.STRING(256),
    validate: {
      isEmail: true
    },
    unique: true
  },
  //creates the year_founded column for the company table
  year_founded: {
    type: DataTypes.INTEGER,
    allowNull: false
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