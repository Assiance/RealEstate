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

Company.hasOne(Address);

Company.hasMany(Agents);
Agents.belongsTo(Company);

Company.hasMany(Properties);
Properties.belongsTo(Company);

module.exports = Company;