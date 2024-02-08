const { DataTypes } = require('sequelize');
const { sequelize } = require('./data-connections');
const Address = require('./address-model');

//creates the property table
const Properties = sequelize.define('properties', {
  //creates the ID column for the property table
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  //creates the # of bed rooms column for the property table
  num_of_bedrooms: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  //creates the # of bathrooms column for the property table
  num_of_bathrooms: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  //creates the HOA column for the property table
  has_HOA: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  //creates the square feet column for the property table
  square_feet: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  //creates the year built column for the property table
  year_built: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  //creates the property type column for the property table
  property_type: {
    type: DataTypes.ENUM('land', 'single family', 'multi family', 'apartment'),
    allowNull: false
  },
  //creates the sales price column for the property table
  sales_price: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  //creates the lot size column for the property table
  lot_size: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  //creates the stories column for the property table
  stories: {
    type: DataTypes.ENUM('single story', 'multi story'),
    allowNull: false
  }
});

//shows the relationship between the properties table and address table
Address.hasOne(Properties);
Properties.belongsTo(Address);

//exports the properties model
module.exports = Properties;