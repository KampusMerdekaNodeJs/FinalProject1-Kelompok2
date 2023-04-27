const router = require('express').Router();
const {Register, login} = require ('../controllers/user');

router.post('/register', Register);
router.post('/login', login);

module.exports=router