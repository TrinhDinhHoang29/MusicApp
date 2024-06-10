 import { Request,Response,NextFunction } from "express";


export const valiCreate = (req:Request,res:Response,next:NextFunction):void=>{

    const {title,avatar,description,status} = req.body;
    console.log(title, avatar, description, status);
    const trimmedTitle = title ? title.trim() : '';
    const trimmedAvatar = avatar ? avatar.trim() : '';
    const trimmedDescription = description ? description.trim() : '';
    const trimmedStatus = status ? status.trim() : '';
    if (!trimmedTitle || !trimmedAvatar || !trimmedDescription || !trimmedStatus) {
        req["flash"]('error', 'Vui lòng nhập đầy đủ thông tin !!');
        res.redirect('back');
        return;
    }
    next();
}

export const valiEdit = (req:Request,res:Response,next:NextFunction):void=>{

    const {title,avatar,description,status} = req.body;
    console.log(title, avatar, description, status);
    const trimmedTitle = title ? title.trim() : '';
    const trimmedDescription = description ? description.trim() : '';
    const trimmedStatus = status ? status.trim() : '';
    if (!trimmedTitle  || !trimmedDescription || !trimmedStatus) {
        req["flash"]('error', 'Vui lòng nhập đầy đủ thông tin !!');
        res.redirect('back');
        return;
    }
    next();
}