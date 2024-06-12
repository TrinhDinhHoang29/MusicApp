import express,{Express, Request,Response} from 'express';

import songsModel from '../../models/song.model';
import singersModel from '../../models/singer.model';
import topicsModel from '../../models/topic.model';
import paginationHelper from '../../helpers/pagination';
import * as isValid from '../../validates/isValids.validates';
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
       sort.title = req.query.sort ;
    }
    // pagination start -----------------------------------
    let objPagination:any = {
        limiteItem:4,
        currentPage:1,   
    }
    if(isValid.isValidLimiteItem(req.query.limiteItem)){
        objPagination.limiteItem=req.query.limiteItem;
    }
    const countSong = await songsModel.find(filter).countDocuments();
    objPagination.totalPage = Math.ceil(countSong/objPagination.limiteItem);
    const resultPagination = paginationHelper(objPagination,req.query);

    // pagination end ---------------------------------------

    const songs = await songsModel.find(filter).limit(objPagination.limiteItem).skip(objPagination.skipItem).sort(sort).lean();
    
    const topicTitles = await topicsModel.find({}).select("id title");
    const singerFullNames = await singersModel.find({}).select("id fullName");

    //Gán tên ca sĩ và tiêu đề topic cho bài hát
    for(const song of songs){
       const topic = topicTitles.find(item=>item._id == song.topicId);
       song.titleTopic = topic.title;
       const singer = singerFullNames.find(item=>item._id == song.singerId);
       song.fullNameSinger = singer.fullName;
    }
    //END Gán tên ca sĩ và tiêu đề topic cho bài hát

    res.render("admin/pages/songs/index",{songs:songs,objPagination:resultPagination});
}
export const create = async (req:Request,res:Response):Promise<void>=>{
    const singers = await singersModel.find({deleted:false});
    const topics = await topicsModel.find({deleted:false});

    res.render("admin/pages/songs/create",{singers:singers,topics:topics});
}
export const createPost = async (req:Request,res:Response):Promise<void>=>{
    const countSong = await songsModel.countDocuments({deleted:false});
    const songBody = {
        title:req.body.title,
        avatar:req.body.avatar,
        description:req.body.description,
        singerId:req.body.singerId,
        topicId:req.body.topicId,
        lyrics:req.body.lyrics,
        audio:req.body.audio,
        status:req.body.status,
        posision:req.body.posision?req.body.posision:countSong+1

    }
    try{
        const song = new songsModel(songBody);
        await song.save();
        req["flash"]("success","Thêm chủ đề thành công!!!");
        res.redirect("back");
    }catch(error){
        req["flash"]("error","Thêm chủ đề thất bại!!!");
        res.redirect("back");
    }
}
export const detail = async (req:Request,res:Response):Promise<void>=>{
    const idSong = req.params.id;
    const song = await songsModel.findOne({_id:idSong});
    res.render("admin/pages/songs/detail",{song:song})
}
export const edit = async (req:Request,res:Response):Promise<void>=>{
    const idSong = req.params.id;
    const song = await songsModel.findOne({_id:idSong}).lean();
    const topics = await topicsModel.find({}).select("id title");
    const singers = await singersModel.find({}).select("id fullName");
    
    res.render("admin/pages/songs/edit",{song:song,topics:topics,singers:singers})

}

export const actionUpdate = async(req:Request,res:Response):Promise<void>=>{
    const idSong = req.params.id;
    const actionUpdate = req.params.actionUpdate;
    let valueUpdate:(string|boolean) = req.params.status;

    if(req.params.status=="true")
        valueUpdate=true;

    try{
        await songsModel.updateOne({
            _id:idSong
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

export const editPatch = async(req:Request,res:Response):Promise<void>=>{
    const idSong = req.params.id; 
    const songBody = {
        title:req.body.title,
        avatar:req.body.avatar,
        description:req.body.description,
        singerId:req.body.singerId,
        topicId:req.body.topicId,
        lyrics:req.body.lyrics,
        audio:req.body.audio,
        status:req.body.status,
        posision:req.body.posision
    }
    try{
        await songsModel.updateOne({
            _id:idSong
        },songBody);
        req["flash"]("success","Cập nhật thành công!!!");
      
        res.redirect("back");
    }catch(error){
        req["flash"]("error","Cập nhật thất bại!!!");
        res.redirect("back");
    }
}


export const changeMulti = async (req:Request,res:Response):Promise<void>=>{
    const type= req.body.type;
    const value = JSON.parse(req.body.value);

        switch(type){
            case "active":
                await songsModel.updateMany({
                    _id:value
                },{
                    status:"active"
                });
                break;
            case "inactive":
                await songsModel.updateMany({
                    _id:value
                },{
                    status:"inactive"
                })
                break;
            case "delete-all":
                await songsModel.updateMany({
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

