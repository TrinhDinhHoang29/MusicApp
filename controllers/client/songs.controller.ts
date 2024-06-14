import express,{Express, Request,Response} from 'express';

import songsModel from '../../models/song.model';
import singerModel from '../../models/singer.model';

export const index = async (req:Request,res:Response):Promise<void>=>{
    const idSong:string = req.params["id"];
    const song = await songsModel.findOne({_id:idSong}).lean();
    const singer = await singerModel.findOne({_id:song.singerId}).select("fullName");
    song.fullNameSinger = singer.fullName;
    
    res.render("client/pages/songs/index",{song:song});
}