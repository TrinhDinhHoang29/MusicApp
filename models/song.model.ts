import mongoose, { Schema } from "mongoose";
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);
const songSchema:Schema = new  mongoose.Schema({
    title:String,
    avatar:String,
    description:String,
    singerId:String,
    topicId:String,
    posision:Number,
    like:{
        default:[],
        type:Array
    },
    lyrics:String,
    views:{
        default:0,
        type:Number
    },
    audio:String,
    status:String,
    slug:{
        type:String,
        slug:"title",
        unique:true
    },
    deleted:{
        type:Boolean,
        default:false
    },
    deleteAt:Date
    
},{
    timestamps:true
});
const Songs = mongoose.model("Songs",songSchema,"songs");
export default Songs;