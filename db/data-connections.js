const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('Real_Estate', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});

const connectToDb = async () => {
  try {
    sequelize.sync({ force: true });

    await sequelize.authenticate();
    console.log("Successfully connected to our db")

  } catch (error) {
    console.log(error)

  }
}

module.exports = {sequelize, connectToDb}