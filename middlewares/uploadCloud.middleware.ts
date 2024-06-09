import * as cloud from "../helpers/uploadCloud.helper";

export default async (req, res, next)=>{
    if(req.file){   
        const link =await cloud.upload(req.file.buffer);
        req.body[req.file.fieldname] = link;
    }
    next();
}