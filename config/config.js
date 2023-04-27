const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  user: process.env.USER_PG_DB,
  host: process.env.HOST_DB,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD_db,
  port: process.env.PORT_DB,
});

pool.on("connect", () => {
  console.log("connected to the db");
});

module.exports = {pool};
