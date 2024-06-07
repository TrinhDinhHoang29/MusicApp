import express,{Express, Request,Response} from 'express';

import topicsModel from '../../models/topics.model';


export const index = async (req:Request,res:Response):Promise<void>=>{
    const topics = await topicsModel.find({});
    console.log(topics);
    res.render("client/pages/topics/index");
}