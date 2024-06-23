import express,{Express, Request,Response} from 'express';

import songsModel from '../../models/song.model';
import singerModel from '../../models/singer.model';

export const index = async (req:Request,res:Response):Promise<void>=>{
    try {
        
    const slug:string = req.params["slug"];
    const song:any = await songsModel.findOne({slug:slug}).lean();
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
        const song:any = await songsModel.findOne({slug:slug}).lean();
        const singer = await singerModel.findOne({_id:song.singerId}).select("fullName");
        const dataTime = new Date(song.createdAt);
        song.dateTime = `${dataTime.getDay()}/${dataTime.getMonth()}/${dataTime.getFullYear()}`;
        song.fullNameSinger = singer.fullName;
        res.render("client/pages/songs/index",{song:song});

        
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
}
export const like = async (req:Request,res:Response):Promise<void>=>{
        
    try {
        const idSong = req.params.idSong;
        const idUser:string = res.locals.userInfo.id;
        const song = await songsModel.findOne({
            _id:idSong,
            like:{
                $in:idUser
            }
        });
        if(song){
         const songUpdated= await songsModel.findOneAndUpdate({
                _id:idSong
            },{
                $pull:{
                    like:idUser
                }
            },{
                new: true
            })
            res.json({
                code:200,
                data:{
                    id:idSong,
                    like:songUpdated.like
                },
                type:"Cancel"
            })
            console.log(songUpdated);

        }else{
            const songUpdated =  await songsModel.findOneAndUpdate({
                _id:idSong
            },{
                $push:{
                    like:idUser
                }
            },{
                new:true
            })
            res.json({
                code:200,
                data:{
                    id:idSong,
                    like:songUpdated.like
                },
                type:"Like"
            })
            console.log(songUpdated);

        }
    } catch (error) {
        console.error(error);
        res.json({
            code:404
        })
    }
}
export const views = async (req:Request,res:Response):Promise<void>=>{
    try{
        const slug = req.params.slug;
        const songViews:any = await songsModel.findOne({slug:slug}).select("views");
        const views:any =  songViews.views+1;
        const songUpdate = await songsModel.findOneAndUpdate({
            slug:slug
        },{
            views:views
        },{
            new:true
        })        
        res.json({
            code:200,
            views:songUpdate.views
        })
    }catch(error){
        res.json({
            code:404,
            mess:"Update error"
        })
    }
}