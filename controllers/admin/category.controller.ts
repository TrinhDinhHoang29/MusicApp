import express,{Express, Request,Response} from 'express';
import * as isValid from "../../validates/isValids.validates";
import paginationHelper from '../../helpers/pagination';
import categorysModel from '../../models/category.model';
export const index = async (req:Request,res:Response):Promise<void>=>{
    type typeFilter={
        deleted:boolean,
        status?:string,
    }
    let sort:any = {
        title:"asc"
    }
    let filter:typeFilter = {
        deleted:false
    }
    if(req.query.typeFilter){
        filter.status = req.query.typeFilter as string;
    }
    if(isValid.isValidSort(req.query.sort)){
       sort.fullName = req.query.sort ;
    }
    // pagination start -----------------------------------
    let objPagination:any = {
        limiteItem:4,
        currentPage:1,   
    }
    if(isValid.isValidLimiteItem(req.query.limiteItem)){
        objPagination.limiteItem=req.query.limiteItem;
    }
    const countcategory = await categorysModel.find(filter).countDocuments();
    objPagination.totalPage = Math.ceil(countcategory/objPagination.limiteItem);
    const resultPagination = paginationHelper(objPagination,req.query);

    // pagination end ---------------------------------------

    const categorys = await categorysModel.find(filter).limit(objPagination.limiteItem).skip(objPagination.skipItem).sort(sort).lean()
    res.render("admin/pages/categorys/index",{categorys:categorys,objPagination:resultPagination});
}
export const create = async (req:Request,res:Response):Promise<void>=>{

    res.render("admin/pages/categorys/create",{});
}
export const createPost = async (req:Request,res:Response):Promise<void>=>{
    const categoryBody = {
        title:req.body.title,
        description:req.body.description,
        status:req.body.status,
    }
    try{
        const category = new categorysModel(categoryBody);
        await category.save();
        req["flash"]("success","Thêm thành công!!!");
        res.redirect("back");
    }catch(error){
        req["flash"]("error","Thêm thất bại!!!");
        res.redirect("back");
    }

}
export const detail = async (req:Request,res:Response):Promise<void>=>{
    const idCategory = req.params.id;
    try{
        const category = await categorysModel.findOne({_id:idCategory});
        res.render("admin/pages/categorys/detail",{category:category})
    }catch(error){
        res.redirect("back");
    }
    
}
export const edit = async (req:Request,res:Response):Promise<void>=>{
    const idCategory = req.params.id;
    try{
        const category = await categorysModel.findOne({_id:idCategory});
        res.render("admin/pages/categorys/edit",{category:category,})
    }catch(error){
        res.redirect("back");
    }

}
export const editPatch = async(req:Request,res:Response):Promise<void>=>{
    const idCategory = req.params.id; 
    const categoryBody = {
        title:req.body.title,
        status:req.body.status,
        description:req.body.description

    }
    try{
        await categorysModel.updateOne({
            _id:idCategory
        },categoryBody);
        req["flash"]("success","Cập nhật thành công!!!");
      
        res.redirect("back");
    }catch(error){
        req["flash"]("error","Cập nhật thất bại!!!"+error);
        res.redirect("back");
    }
}


export const actionUpdate = async(req:Request,res:Response):Promise<void>=>{
    const idCategory = req.params.id;
    const actionUpdate = req.params.actionUpdate;
    let valueUpdate:(string|boolean) = req.params.status;

    if(req.params.status=="true")
        valueUpdate=true;

    try{
        await categorysModel.updateOne({
            _id:idCategory
        },{
            [actionUpdate]:valueUpdate
        })
        res.json({
            code:200,
            message:"Cập nhật thành công !!"
        })
    }catch(error){
        res.json({
            code:404,
            message:"Cập nhật thất bại !!"
        })
    }
}

export const changeMulti = async (req:Request,res:Response):Promise<void>=>{
    const type= req.body.type;
    const value = JSON.parse(req.body.value);

        switch(type){
            case "active":
                await categorysModel.updateMany({
                    _id:value
                },{
                    status:"active"
                });
                break;
            case "inactive":
                await categorysModel.updateMany({
                    _id:value
                },{
                    status:"inactive"
                })
                break;
            case "delete-all":
                await categorysModel.updateMany({
                    _id:value
                },{
                    deleted:true
                })
                break;
            default:
                req["flash"]("error","Cập nhật thất bại!!!");
                res.redirect("back");
                return;
            }
    req["flash"]("success","Cập nhật thành công!!!");
    res.redirect("back");
}