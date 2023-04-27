const { pool } = require("../config/config");
const bcrypt = require('bcrypt');

const regist = async (data) => {
    console.log(data);
    const hashedPassword = await bcrypt.hash(data.password, 10); // Generate a hash of the password
    const query =
        "INSERT INTO users(email, password)  VALUES($1, $2) RETURNING *";
    const values = [data.email, hashedPassword];
    const result = await pool.query(query, values);
    return result;
};

const getuser = async (data) => {
    console.log(data);
    const query =
        "SELECT * FROM users WHERE email = $1";
    const values = [data.email];
    const result = await pool.query(query, values);
    return result.rows[0];
}

const getuserbyId = async (data) => {
    console.log(data.id);
    const query =
        "SELECT * FROM users WHERE id = $1";
    const values = [data.id];
    const result = await pool.query(query, values);
    return result;
}

module.exports = {regist, getuser, getuserbyId}