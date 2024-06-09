import express,{Express, Request,Response} from 'express';

import topicsModel from '../../models/topic.model';


export const index = async (req:Request,res:Response):Promise<void>=>{
    const topics = await topicsModel.find({});
    res.render("client/pages/topics/index");
}