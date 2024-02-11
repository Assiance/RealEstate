const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('real_estate', 'root', 'password', {
  host: 'localhost',
  dialect: 'mysql'
});  

const connectToDb = async () => {
  try {
    sequelize.sync({ force: false });

    await sequelize.authenticate();
    console.log("Successfully connected to our db")

  } catch (error) {
    console.log(error)

  }
}

module.exports = {sequelize, connectToDb}