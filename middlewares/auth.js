const jwt = require('jsonwebtoken');
const model = require('../models/user')

const authenticate = async (req, res, next) => {
  try {
    const authtoken = req.headers.auth;
    console.log(authtoken);
    if (!authtoken) {
      return res.status(401).json({ error: 'Unauthorized: Invalid or missing authentication token' });
    }
    const decoded = jwt.verify(authtoken, 'rahasia');
    const userId = decoded.id;
    const user = await model.getuserbyId(decoded);
    if (!user.rows[0]) {
      return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
    console.log(req.body);
    req.body.UserId = userId;
    console.log(decoded.id);
    next();
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {authenticate}