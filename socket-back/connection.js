require("dotenv").config();
const { Sequelize } = require("sequelize");

const connection = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

module.exports = { connection };
