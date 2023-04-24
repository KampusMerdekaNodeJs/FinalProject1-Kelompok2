const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.USER_PG_DB,
  host: process.env.HOST_DB,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD_db,
  port: process.env.PORT_DB,
});

module.exports = pool;
