const { DataTypes } = require('sequelize');
const { sequelize } = require('./data-connections');

//creates the address table
const Address = sequelize.define('addresses', {
  //creates the stories column for the property table
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  //creates the stories column for the property table
  street: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  //creates the city column for the property table
  city: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  //creates the state column for the property table
  state: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  //creates the country column for the address table
  country: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  //creates the apt # column for the address table
  apt_number: {
    type: DataTypes.STRING(4),
    allowNull: true,
    unique: true
  },
  //creates the suite # column for the address table
  suite_number: {
    type: DataTypes.STRING(4),
    allowNull: true
  },
  zipcode: {
    type: DataTypes.STRING(5),
    allowNull: false
  }
});

//exports the address model
module.exports = Address;