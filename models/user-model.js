const pool = require("../connection/connection-setup");
const { v4: uuidv4 } = require("uuid");

class Users {
  static async insertOne(email, password) {
    try {
      const { rows } = await pool.query("SELECT * FROM users where email=$1 ", [
        email,
      ]);

      if (rows[0]) throw new Error("Email/password sudah digunakan");
      return new Promise((resolve, reject) => {
        pool
          .query(
            "INSERT INTO users(id,email,password) VALUES($1,$2,$3) RETURNING *",
            [uuidv4(), email, password]
          )
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
      });
    } catch (err) {
      return new Promise((resolve, _) => {
        resolve(err.message);
      });
    }
  }

  static loginUser(email, password) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pool.query(
          "SELECT * FROM users where email=$1 AND password=$2",
          [email, password]
        );
        if (result.rowCount <= 0) throw { name: "ErrUserNotDefined" };
        resolve(result);
      } catch (err) {
        let errorMessage = "";
        if (err.name === "ErrUserNotDefined")
          errorMessage = "Email atau password yang dimasukan salah";

        reject(errorMessage);
      }
    });
  }
}
module.exports = Users;
