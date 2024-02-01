const { DataTypes } = require('sequelize');
const sequelize = require('./data-connections');

const Address = sequelize.define('addresses', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  street: {
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
  country: {
    type: DataTypes.STRING(64),
    allowNull: false,
  },
  apt_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  suite_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
})

module.exports = Address;