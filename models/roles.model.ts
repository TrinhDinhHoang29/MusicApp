import mongoose,{Schema} from "mongoose";

const rolesSchema:Schema = new mongoose.Schema({
    title:String,
    description:String,
    permissions:{
        type:Array,
        default:[]
    },
    deleted:{
        type:Boolean,
        default:false
    },
    deletedBy:{
        id:String,
        deleteAt:Date
    },
    createdBy:{
        id:String,
        createAt:{
            type:Date,
            default:Date.now
        }
    }
},{
    timestamps:true
});

const roles = mongoose.model("Roles",rolesSchema,"roles");
export default roles;