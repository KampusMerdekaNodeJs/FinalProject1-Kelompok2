const { pool } = require("../config/config");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const model = require('../models/user')

const Register = async (req, res, next) => {
  const data = req.body;
    try{
    const result = await model.regist(data);
    return res.status(201).json({
      status:201, 
      message: "Users added successfully", 
      data: result.rows
    });
  } catch (error) {
    return next(error);
  }
};

const login = async(req, res) => {
  try {
    const data = req.body;
    const user = await model.getuser(data);

    if (!user) {
      return res.status(404).json({ error: 'Email not found' });
    }
    const comparePassword = require('../helpers/bcrypt')
    if (!comparePassword) {
      return res.status(400).json({ error: 'Invalid email or password: Incorrect password' });
    }
    const TokenGenerate = jwt.sign({ id: user.id }, 'rahasia');
    res.json({ TokenGenerate });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error: Unable to process the request' });
  }
};



module.exports = {Register, login}