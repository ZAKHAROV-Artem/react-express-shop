const Sequalize = require("sequelize");
module.exports = new Sequalize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.DB_Host,
    port: process.env.DB_PORT,
  }
);
