const { sequelize } = require('./data-connections');
const { DataTypes } = require('sequelize')
const bcrypt = require('bcrypt');


//creates the user table
const Users = sequelize.define('users', {
  //creates the ID column for the user table
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  //creates the firstName column for the user table
  first_name: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  //creates the lastName column for the user table
  last_name: {
    type: DataTypes.STRING(64),
    allowNull: false
  },
  //creates the email column for the user table
  email: {
    type: DataTypes.STRING(256),
    unique: true,
    validate: {
      isEmail: true
    }
  },
  //creates the password column for the user table
  password: {
    type: DataTypes.STRING(256),
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

//exports the users model
module.exports = Users;