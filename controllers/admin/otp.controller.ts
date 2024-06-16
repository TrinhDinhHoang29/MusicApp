import express,{Express, Request,Response} from 'express';
import otpModel from '../../models/otp.model';
import * as nodemailerHelper from '../../helpers/nodemailer.helper';
export const create = async (req:Request,res:Response):Promise<void>=>{
    if(res.locals.account){
        try{
            const otp = new otpModel({
                email:res.locals.account.email,
                expireAt:Date.now(),
            });
            await otp.save();
            nodemailerHelper.sendOTP(otp["email"] as string,"Xác thực thông tin tài khoảng",`Mã OTP của bạn là : <b>${otp.otp}</b>`);
            res.json({
                code:200,
                message:"Send success !!"
            })
        }catch(error){
            res.json({
                code:404,
                message:"Send error !!"
            })
        }
        
    }
}