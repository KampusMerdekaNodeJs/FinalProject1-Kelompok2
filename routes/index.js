const express = require("express");
const router = express.Router();
const reflections = require('./reflection')
const user = require('./user')


router.use('/api/v1/reflections', reflections)
router.use('/api/v1/users', user)


module.exports = router;