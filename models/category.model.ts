import mongoose, { Schema } from "mongoose";
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);
const categorySchema:Schema = new  mongoose.Schema({
    title:String,
    description:String,
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
const categorys = mongoose.model("categorys",categorySchema,"categorys");
export default categorys;