require("dotenv").config();
const { Pool } = require("pg");
const pool = require("../connection/connection-setup");

(async function () {
  try {
    await pool.query(`create table users (
            id uuid primary key,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) not null 
            
            
        );
        
        `);
    await pool.end();
  } catch (err) {
    console.log("Error => " + err.message);
  }
})();
