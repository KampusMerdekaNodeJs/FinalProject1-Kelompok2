const pool = require("../connection/connection-setup");
const { v4: uuidv4 } = require("uuid");

class Reflection {
  insertOne(a) {
    return new Promise(async (resolve, reject) => {
      console.log(a.owner_id);
      try {
        const result = await pool.query(
          `INSERT INTO reflections(id,success,low_point,take_away,owner_id,created_date,modified_date)
         VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *`,
          [
            uuidv4(),
            a.success,
            a.low_point,
            a.take_away,
            a.owner_id,
            a.created_date,
            a.modified_date,
          ]
        );

        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  findAll(condition) {
    //mencari keseluruhan data berdasarkan where condition
    //not yet implemented

    return new Promise(async (resolve, reject) => {
      try {
        const { rows } = await pool.query(
          "SELECT * FROM reflections where owner_id=$1",
          [condition]
        );
        resolve(rows);
      } catch (err) {
        reject(err);
      }
    });
  }

  deleteOne(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pool.query(
          "DELETE FROM reflections where id=$1 AND owner_id=$2 RETURNING *",
          [data.id, data.owner_id]
        );
        if (result.rows.length === 0) throw new Error("Data not found");
        resolve(result);
      } catch (err) {
        reject(err.message);
      }
    });
  }

  findOne(id_data) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pool.query(
          `SELECT * FROM reflections where id=$1`,
          [id_data]
        );
        resolve(result);
      } catch (err) {
        reject(err);
      }
    });
  }

  update(data) {
    return new Promise(async (resolve, reject) => {
      try {
        data.modified_date = new Date();
        const result = await pool.query(
          `UPDATE reflections SET success = $1, low_point = $2, take_away = $3, modified_date = $4 WHERE id = $5 AND owner_id=$6 RETURNING *`,
          [
            data.success,
            data.low_point,
            data.take_away,
            data.modified_date,
            data.id,
            data.owner_id,
          ]
        );
        resolve(result);
      } catch (err) {
        reject("Id not match");
      }
    });
  }
}

module.exports = new Reflection();
