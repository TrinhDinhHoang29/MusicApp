import express,{Express, Request,Response} from 'express';

import topicsModel from '../../models/topic.model';


export const index = async (req:Request,res:Response):Promise<void>=>{
    const topics = await topicsModel.find({
        deleted:false,
    });
    res.render("admin/pages/topics/index",{topics:topics});
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
        console.log(error);
    }
}
export const detail = async (req:Request,res:Response):Promise<void>=>{
    const idTopic = req.params.id;
    const topic = await topicsModel.findOne({_id:idTopic});
    res.render("admin/pages/topics/detail",{topic:topic})
}
export const edit = async (req:Request,res:Response):Promise<void>=>{
    const idTopic = req.params.id;
    const topic = await topicsModel.findOne({_id:idTopic});
    res.render("admin/pages/topics/edit",{topic:topic})

}

export const actionUpdate = async(req:Request,res:Response):Promise<void>=>{
    const idTopic = req.params.id;
    const actionUpdate = req.params.actionUpdate;
    let valueUpdate:(string|boolean) = req.params.status;

    if(req.params.status=="true")
        valueUpdate=true;

    try{
        await topicsModel.updateOne({
            _id:idTopic
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
    const idTopic = req.params.id;
    const topicBody = {
        title:req.body.title,
        avatar:req.body.avatar,
        description:req.body.description,
        status:req.body.status
    } 
    try{
        await topicsModel.updateOne({
            _id:idTopic
        },topicBody);
        const topic =  await topicsModel.findOne({_id:idTopic})
        req["flash"]("success","Cập nhật chủ đề thành công!!!");
        res.render("admin/pages/topics/edit",{topic:topic})
    }catch(error){
        req["flash"]("error","Cập nhật chủ đề thất bại!!!");
        const topic =  await topicsModel.findOne({_id:idTopic})
        res.render("admin/pages/topics/edit",{topic:topic})
    }
}
export const deleted = async (req:Request,res:Response):Promise<void>=>{

}