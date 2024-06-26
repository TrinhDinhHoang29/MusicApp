import express,{Express, Request,Response} from 'express';
import songsModel from '../../models/song.model';
import topicsModel from '../../models/topic.model';
import singersModel from '../../models/singer.model';
import conVertToSlug from '../../helpers/convertToSlug.helper';
export const index = async (req:Request,res:Response):Promise<void>=>{
    try {
        const topics = await topicsModel.find({
            status:"active",
            deleted:false
        }).select("id slug title avatar ").limit(3);
        const songs = await songsModel.find({
            status:"active",
            deleted:false
        }).limit(6).sort({
            createdAt:"desc"
        }).lean();
        const singers = await  singersModel.find({});
        for(const song of songs){
            const singer = singers.find(item=>item._id==song.singerId);
            song.fullNameSinger = singer.fullName;
        }
        res.render("client/pages/home/index",{topics:topics,songs:songs});
        

    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
    
}