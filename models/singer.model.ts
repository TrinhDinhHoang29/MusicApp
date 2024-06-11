import mongoose, { Schema } from "mongoose";
import slug from 'mongoose-slug-updater';
mongoose.plugin(slug);

const singerSchema:Schema = new  mongoose.Schema({
    fullName:String,
    avatar:String,
    status:String,
    slug:{
        type:String,
        slug:"fullName",
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
const Singers = mongoose.model("Singers",singerSchema,"singers");
export default Singers;