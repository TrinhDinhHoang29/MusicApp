import { Request,Response,NextFunction } from "express"
import usersModel from '../models/user.model';


const isEmail = async (email:string):Promise<boolean>=>{
    const existsEmail = await usersModel.findOne({email:email});
    if(existsEmail)
        return true;
    return false;

}
export const valiCreate = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const {fullName,email,password,rePassword} = req.body;
    const existsEmail:boolean = await isEmail(email);
    if(!fullName.trim()||!email.trim()||!password.trim()||!rePassword.trim()||existsEmail){
        req["flash"]("error","Tạo tài khoản thất bại!!!");
        res.redirect("back");
        return;
    }
    if(password!==rePassword){
        req["flash"]("error","Tạo tài khoản thất bại!!!");
        res.redirect("back");
        return;
    }
    next();
}
export const valiLogin = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const {email,password} = req.body;
    if(!email.trim()||!password.trim()){
        req["flash"]("error","Không để trống thông tin !!!");
        res.redirect("back");
        return;
    }
    
    next();
}
// export const valiEdit = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
//     const {fullName,email,status} = req.body;
//     let existsEmail:boolean = false;
//     const id = req.params.id;
//     const accountEmail = await accountModel.findOne({_id:id,email:email});
//     if(!accountEmail){
//         existsEmail = await isEmail(email);
//     }
//     if(!fullName.trim()||!email.trim()||!status.trim()||existsEmail){
//         req["flash"]("error","Sửa thất bại!!!");
//         res.redirect("back");
//         return;
//     }
//     next();

// }