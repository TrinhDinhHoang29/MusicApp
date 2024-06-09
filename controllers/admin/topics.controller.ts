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
    console.log(req.body);
    // res.render("admin/pages/topics/create");
}