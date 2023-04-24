require("dotenv").config();
const { Pool } = require("pg");
const pool = require("../connection/connection-setup");

(async function () {
  try {
    await pool.query(`create table users (
            id uuid primary key,
            password varchar not null, 
            email varchar not null
            
        );
        
        `);
    await pool.end();
  } catch (err) {
    console.log("Error => " + err.message);
  }
})();
