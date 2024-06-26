import mongoose, { Schema } from "mongoose";
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);

const topicSchema:Schema = new  mongoose.Schema({
    title:String,
    avatar:String,
    description:String,
    categoryId:String,
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
const Topics = mongoose.model("Topics",topicSchema,"topics");
export default Topics;