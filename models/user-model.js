const pool = require("../connection/connection-setup");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

class Users {
  static async insertOne(email, password) {
    try {
      const { rows } = await pool.query("SELECT * FROM users where email=$1 ", [
        email,
      ]);
  
      if (rows[0]) throw new Error("Email sudah digunakan");
  
      // hash password dengan bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);
  
      return new Promise((resolve, reject) => {
        pool
          .query(
            "INSERT INTO users(id, email, password) VALUES($1,$2,$3) RETURNING *",
            [uuidv4(), email, hashPassword]
          )
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (err) {
      // handling error
      console.error(err);
      return new Promise((resolve, _) => {
        resolve({ error: err.message });
      });
    }
  }
  

  static loginUser(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pool.query(
          "SELECT * FROM users where email=$1",
          [email]
        );

        if (result.rowCount <= 0) {
          throw new Error("Email atau password yang dimasukan salah");
        }

        const isMatch = await bcrypt.compare(password, result.rows[0].password);

        if (!isMatch) {
          throw new Error("Email atau password yang dimasukan salah");
        }

        resolve(result);
      } catch (err) {
        // handling error
        console.error(err);
        reject({ error: err.message });
      }
    });
  }
}

module.exports = Users;
