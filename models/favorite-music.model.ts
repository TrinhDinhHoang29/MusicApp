import mongoose, { Schema } from "mongoose";
import slug from 'mongoose-slug-updater';

const favoriteSongSchema:Schema = new  mongoose.Schema({
    userId:String,
    songId:String,
},{
    timestamps:true
});
const favoriteSongs = mongoose.model("Favorite-Songs",favoriteSongSchema,"favorite-songs");
export default favoriteSongs;