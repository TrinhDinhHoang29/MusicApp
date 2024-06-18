import express,{Express, Request,Response} from 'express';

import topicsModel from '../../models/topic.model';
import categorysModel from '../../models/category.model';
import songsModel from '../../models/song.model';
import singersModel from '../../models/singer.model';
export const index = async (req:Request,res:Response):Promise<void>=>{
    
    try{
        const categorys = await categorysModel.find({status:"active",deleted:false}).lean();
        for(const category of categorys){
        category.listTopic = await topicsModel.find({
            categoryId:category._id,
            status:"active",
            deleted:false,
        }).limit(5);
    }
    
    res.render("client/pages/topics/index",{categorys:categorys});
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}

export const detail = async (req:Request,res:Response):Promise<void>=>{
    try{
        const slug = req.params.slug;
        const topic = await topicsModel.findOne({slug:slug ,status:"active",deleted:false});
        const songs = await songsModel.find({status:"active",deleted:false ,topicId:topic._id }).lean();
        const singers = await  singersModel.find({});
    for(const song of songs){
        const singer = singers.find(item=>item._id==song.singerId);
        song.fullNameSinger = singer.fullName;
    }
    res.render("client/pages/topics/detail",{songs:songs,topic:topic});
    }catch(error){
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    
}