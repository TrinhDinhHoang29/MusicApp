import mongoose, { Schema } from "mongoose";
            
const favoriteSongSchema:Schema = new  mongoose.Schema({
    userId:String,
    songId:String,
},{
    timestamps:true
});
const favoriteSongs = mongoose.model("Favorite-Songs",favoriteSongSchema,"favorite-songs");
export default favoriteSongs;