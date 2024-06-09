const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('real_estate', process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql'
});  

const connectToDb = async () => {
  try {
    sequelize.sync({ force: process.env.DB_FORCE_UPDATE });

    await sequelize.authenticate();
    console.log("Successfully connected to our db")

  } catch (error) {
    console.log(error)

  }
}

module.exports = { sequelize, connectToDb }
