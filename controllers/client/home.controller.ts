import express,{Express, Request,Response} from 'express';

import topicsModel from '../../models/topic.model';


export const index = async (req:Request,res:Response):Promise<void>=>{
    res.render("client/pages/home/index");
}