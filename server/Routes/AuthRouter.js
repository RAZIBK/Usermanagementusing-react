const {register, login,adminlogin,getuser,blockUser,unblockUser,deleteUser,getuserdata,updateUser}=require('../Controllers/AuthControllers');
const { checkUser,checkAdmin } = require('../Middlewares/AuthMiddlewares');
const router =require('express').Router();

router.post('/',checkUser);
router.post('/register',register)
router.post('/login',login)
router.post('/admin',checkAdmin)
router.post('/adminlogin',adminlogin,)
router.get('/getuser',getuser);
router.put('/blockUser/:id',blockUser)
router.put('/unblockUser/:id',unblockUser)
router.post('/deleteUser/:id',deleteUser)
router.get('/admin/getuserdata/:id',getuserdata)
router.put('/admin/useredit/:id',updateUser)





module.exports=router;