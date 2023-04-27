const { pool } = require("../config/config");

const insertref = async (data) => {
    const date = new Date();
    console.log(date);
    const query =
        "INSERT INTO reflections(success, low_point, take_away, UserId, createdat, updatedat)  VALUES($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [data.success, data.low_point, data.take_away, data.UserId, date, date];
    const result = await pool.query(query, values);
    return result;
};

const getall = async (data) => {
    console.log(data);
    const query =
        "SELECT id, success, low_point, take_away FROM reflections WHERE userid = $1;";
    const values = [data];
    const result = await pool.query(query, values);
    console.log(result);
    return result;
};

const updateref = async (data) => {
    const date = new Date();
    console.log(date);
    const query =
        "UPDATE reflections SET success = $1, low_point = $2, take_away = $3, updatedat = $4 WHERE id = $5 AND UserId = $6 RETURNING *";
    const values = [data.success, data.low_point, data.take_away, date, data.id, data.UserId];
    const result = await pool.query(query, values);
    return result
};

const deleteref = async (data) => {
    console.log(data);
    const query =
        "DELETE FROM reflections WHERE id = $1 AND UserId = $2 RETURNING *";
    const values = [data.id, data.UserId];
    const result = await pool.query(query, values);
    return result
};

module.exports = {insertref, getall, updateref, deleteref}