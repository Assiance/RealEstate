const { sequelize } = require('./data-connections');
const { DataTypes } = require('./sequelize')
const bcrypt = require('bcrypt');

//create the user table
const Users = sequelize.define('users', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true

  },
  firstName: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING(64),
    // allowNull defaults to true
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(256),
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING(256),
    allowNull: false
  },
  phone: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  hooks: {
    // Hook that runs whenever User is created or updated
    beforeSave: async (user, options) => {
      //if user is a new record or password has been updated
      if (user.isNewRecord || user.changed('password')) {
        const saltRounds = 10;
        user.password = await bcrypt.hash(user.password, saltRounds);
      }
    }
  }
});
module.exports = Users;