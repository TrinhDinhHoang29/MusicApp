import express,{Express, Request,Response} from 'express';

import songsModel from '../../models/song.model';
import singerModel from '../../models/singer.model';

export const index = async (req:Request,res:Response):Promise<void>=>{
    try {
        
    const slug:string = req.params["slug"];
    const song = await songsModel.findOne({slug:slug}).lean();
    const singer = await singerModel.findOne({_id:song.singerId}).select("fullName");
    song.fullNameSinger = singer.fullName;
    res.render("client/pages/songs/index",{song:song});
        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    
}
export const detail = async (req:Request,res:Response):Promise<void>=>{
    
    try {
        
        const slug:string = req.params.slug;
        const song = await songsModel.findOne({slug:slug}).lean();
        const singer = await singerModel.findOne({_id:song.singerId}).select("fullName");
        song.fullNameSinger = singer.fullName;
        res.render("client/pages/songs/index",{song:song});

        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}