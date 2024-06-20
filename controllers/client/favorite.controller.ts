import express,{Express, Request,Response} from 'express';
import songsModel from '../../models/song.model';
import favoriteModel from '../../models/favorite-music.model';
export const index = async (req:Request,res:Response):Promise<void>=>{
   const mySongFavorites = await favoriteModel.find({userId:res.locals.userInfo.id})
   .select("-_id -userId -createdAt -updatedAt -__v");
   const formatMySongFavorites = mySongFavorites.map(item=>item.songId);
   const songs = await songsModel.find({
        _id:{
            $in:formatMySongFavorites
        }
   })
   res.render("client/pages/favorites/index",{songs:songs});
    
}
export const create = async (req:Request,res:Response):Promise<void>=>{
    try {
        const idSong = req.params.idSong;
        const idUser:string = res.locals.userInfo.id;
        const favorite = await favoriteModel.findOne({
            userId:idUser,
            songId:idSong
        });
        if(favorite){
            await favoriteModel.deleteOne({
                userId:idUser,
                songId:idSong
            })
            res.json({
                code:200,
                idSong:idSong,
                type:"Delete favorite"
            })
        }else{
            const favorite = new favoriteModel({
                userId:idUser,
                songId:idSong
            });
            await favorite.save();
            res.json({
                code:200,
                idSong:idSong,
                type:"add favorite"
            })
        }
    } catch (error) {
        console.error(error);
        res.json({
            code:404
        })
    }
    
}