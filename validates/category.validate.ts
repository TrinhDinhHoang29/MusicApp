import { Request,Response,NextFunction } from "express"

export const valiCreate = async(req:Request,res:Response,next:NextFunction):Promise<void>=>{
    const {title,status,description,} = req.body;
    if(!title.trim()||!description.trim()||!status.trim()){
        req["flash"]("error","Thêm thất bại!!!");
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