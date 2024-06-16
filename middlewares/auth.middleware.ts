import accountModel from '../models/account.model';
import { Request,Response,NextFunction } from 'express';
 
// const roleModel = require("../../models/roles.model");
export  const checkToken = async (req:Request,res:Response,next:NextFunction):Promise<void>=>{
    if(!req.cookies.token){
        res.redirect("/admin/auth/login");
        return;
    }
    const account = await accountModel.findOne({deleted:false,token:req.cookies.token}).select("-password");   
    if(!account){
        res.redirect("/admin/auth/login");
        return;
    }
    res.locals.account = account;
    // res.locals.role = await roleModel.findOne({_id:user.roleId,deleted:false});
    next();
}