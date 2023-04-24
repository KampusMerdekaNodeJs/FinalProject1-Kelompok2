require("dotenv").config();
const Pool = require("../connection/connection-setup");

(async function () {
  try {
    await Pool.query(`create table reflections(
        id uuid primary key,
        success varchar not null, 
        low_point varchar not null, 
        take_away varchar not null, 
        owner_id uuid references users(id),
        created_date date not null, 
        modified_date date not null
    );
    `);

    await Pool.end();
  } catch (err) {
    console.log("Error => " + err.message);
  }
})();
