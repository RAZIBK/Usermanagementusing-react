const User = require ('../Models/UserModel');
const Admin=require('../Models/AdminModel')
const jwt = require ('jsonwebtoken');
 
module.exports.checkUser=(req,res,next) =>{
    const token=req.cookies.jwt;
    if(token){

        jwt.verify(token,'Razi super secret key',async(err,decodedToken)=>{
            if(err){
                res.json({status:false});
                next();
            }
            else{
                const user = await User.findById(decodedToken.id)
                if(user) {
                    if(user.block){
                        res.json({status:false,errors:'admin blocked you'});
                        next()
                    }else{
                        res.json({status:true,user:user.email})
                    }
                }
                else res.json({status:false});
                next()
            }
        })
    }else{
        res.json({status:false});
        next();
    }
}

module.exports.checkAdmin=(req,res,next) =>{
    // console.log("LFS;LD");
    const token=req.cookies.jwt;
    if(token){

        jwt.verify(token,'Razi super secret key',async(err,decodedToken)=>{
            if(err){
                res.json({status:false});
                next();
            }
            else{
                const admin = await Admin.findById(decodedToken.id)
                if(admin) {
                    res.json({status:true,admin:admin.email})
                }
                else res.json({status:false});
                next()
            }
        })
    }else{
        res.json({status:false});
        next();
    }
}