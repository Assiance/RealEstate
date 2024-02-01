const { DataTypes } = require('sequelize');
const sequelize = require('./data-connection');
const Address = require('./address-model');

const Properties = sequelize.define('properties', {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  num_of_bedrooms: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  num_of_bathrooms: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  has_HOA: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  square_feet: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  year_built: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  property_type: {
    type: DataTypes.ENUM('land', 'single family', 'multi family', 'apartment'),
    allowNull: false
  },
  sales_price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  lot_size: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  stories: {
    type: DataTypes.ENUM('single story', 'multi story'),
    allowNull: false
  }
});

Properties.hasOne(Address);

module.exports = Properties;