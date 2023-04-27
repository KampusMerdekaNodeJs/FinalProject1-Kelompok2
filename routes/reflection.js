const router = require('express').Router();
const {getlist, postData, updateDataById, deleteDataById} = require ('../controllers/reflection');
const {authenticate}= require('../middlewares/auth')


router.get('/',authenticate, getlist);
router.post('/',authenticate, postData);
router.put('/:id',authenticate, updateDataById);
router.delete('/:id',authenticate, deleteDataById);
  


module.exports=router