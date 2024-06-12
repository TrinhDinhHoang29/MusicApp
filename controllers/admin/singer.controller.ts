import express,{Express, Request,Response} from 'express';
import singerModel from '../../models/singer.model';
import * as isValid from '../../validates/isValids.validates';
import paginationHelper from '../../helpers/pagination';

export const index = async (req:Request,res:Response):Promise<void>=>{type typeFilter={
    deleted:boolean,
    status?:string,
}
let sort:any = {
    fullName:"asc"
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
const countTopic = await singerModel.find(filter).countDocuments();
objPagination.totalPage = Math.ceil(countTopic/objPagination.limiteItem);
const resultPagination = paginationHelper(objPagination,req.query);

// pagination end ---------------------------------------
const singers = await singerModel.find(filter).limit(objPagination.limiteItem).skip(objPagination.skipItem).sort(sort);

    res.render("admin/pages/singers/index",{singers:singers,objPagination:resultPagination});
}
export const create = async (req:Request,res:Response):Promise<void>=>{
    res.render("admin/pages/singers/create");
}
export const createPost = async (req:Request,res:Response):Promise<void>=>{
    const singerBody = {
        fullName:req.body.fullName,
        avatar:req.body.avatar,
        status:req.body.status
    }
    try{
        const singer = new singerModel(singerBody);
        await singer.save();
        req["flash"]("success","Thêm ca sỹ thành công!!!");
        res.redirect("back");
    }catch(error){
        req["flash"]("error","Thêm ca sỹ thất bại!!!");
        res.redirect("back");
    }
}

export const detail = async (req:Request,res:Response):Promise<void>=>{
    const idSinger = req.params.id;
    const singer = await singerModel.findOne({_id:idSinger});
    res.render("admin/pages/singers/detail",{singer:singer})
}
export const actionUpdate = async(req:Request,res:Response):Promise<void>=>{
    const idSinger = req.params.id;
    const actionUpdate = req.params.actionUpdate;
    let valueUpdate:(string|boolean) = req.params.status;

    if(req.params.status=="true")
        valueUpdate=true;

    try{
        await singerModel.updateOne({
            _id:idSinger
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
                await singerModel.updateMany({
                    _id:value
                },{
                    status:"active"
                });
                break;
            case "inactive":
                await singerModel.updateMany({
                    _id:value
                },{
                    status:"inactive"
                })
                break;
            case "delete-all":
                await singerModel.updateMany({
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

export const edit = async (req:Request,res:Response):Promise<void>=>{
    const idSinger = req.params.id;
    const singer = await singerModel.findOne({_id:idSinger});
    res.render("admin/pages/singers/edit",{singer:singer})

}
export const editPatch = async(req:Request,res:Response):Promise<void>=>{
    const idSinger = req.params.id;
    const singerBody = {
        fullName:req.body.fullName,
        avatar:req.body.avatar,
        status:req.body.status
    }
    try{
        await singerModel.updateOne({
            _id:idSinger
        },singerBody);
        req["flash"]("success","Cập nhật thành công!!!");
        res.redirect("back");
    }catch(error){
        req["flash"]("error","Cập nhật thất bại!!!");
        res.redirect("back");
    }
}