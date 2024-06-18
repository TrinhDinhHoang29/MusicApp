import express,{Express, Request,Response} from 'express';
import usersModel from '../../models/user.model';
import md5 from 'md5';
export const login = async (req:Request,res:Response):Promise<void>=>{

    res.render("client/pages/auth/login");
    
}
export const loginPatch = async (req:Request,res:Response):Promise<void>=>{
    const user = await usersModel.findOne({deleted:false,email:req.body.email});
    if(!user){
        req["flash"]("error","Không tìm thấy tài khoản !!");
        res.redirect("back");
        return;
    }
    if(user.status === "inactive"){
        req["flash"]("error","Tài khoản đã bị khoá !!");
        res.redirect("back");
        return;
    }
    if(user.password == md5(req.body.password)){
        req["flash"]("success","Đăng nhập thành công !!");
        res.cookie("tokenUser",user.tokenUser,{expires: new Date(Date.now()+360*24*60*60*1000)});
        res.redirect("/home");
    }else{
        req["flash"]("error","Sai mật khẩu!!");
        res.redirect("back");
    }
    
}
export const register = async (req:Request,res:Response):Promise<void>=>{

    res.render("client/pages/auth/register");
}
export const registerPost = async (req:Request,res:Response):Promise<void>=>{
    try{
        const userBody = {
            fullName:req.body.fullName,
            email:req.body.email,
            password:md5(req.body.password)
        }
        const user =  new usersModel(userBody);
        await user.save();
        req["flash"]("success","Tạo tài khoản thành công");
        res.redirect("back");
    }catch(error){
        req["flash"]("error","Tạo tài khoản thất bại");
        res.redirect("back")
    }
    
    
} 