const express=require('express')
const router=express.Router()

const {signup,login,forgetpassword}=require('../controllers/auth')

router.route('/signup').post(signup);
router.route('/login').post(login);
router.route('/forgetpassword').patch(forgetpassword)

module.exports=router