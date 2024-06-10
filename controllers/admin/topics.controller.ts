import express,{Express, Request,Response} from 'express';

import topicsModel from '../../models/topic.model';


export const index = async (req:Request,res:Response):Promise<void>=>{
    const topics = await topicsModel.find({});
    res.render("admin/pages/topics/index");
}

export const create = async (req:Request,res:Response):Promise<void>=>{
    res.render("admin/pages/topics/create");
}

export const createPost = async (req:Request,res:Response):Promise<void>=>{
    const topicBody = {
        title:req.body.title,
        avatar:req.body.avatar,
        description:req.body.description,
        status:req.body.status
    }
    try{
        const topic = new topicsModel(topicBody);
        await topic.save();
        req["flash"]("success","Thêm chủ đề thành công!!!");
        res.redirect("/admin/topics/create");
    }catch(error){
        req["flash"]("error","Thêm chủ đề thất bại!!!");
        res.redirect("/admin/topics/create");
    }
}