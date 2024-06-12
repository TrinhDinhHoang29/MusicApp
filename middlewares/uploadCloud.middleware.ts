import * as cloud from "../helpers/uploadCloud.helper";
import { Request,Response,NextFunction } from "express";
export const uploadSingle= async (req:Request, res:Response, next:NextFunction):Promise<void>=>{
    if(req["file"]){   
        const link =await cloud.upload(req["file"].buffer);
        req.body[req["file"].fieldname] = link;
    }
    next();
}

export const uploadFields= async (req:Request, res:Response, next:NextFunction):Promise<void>=>{
    if(req["files"].avatar){
        for(const avatar of req["files"].avatar){
            const linkImage =await cloud.upload(avatar.buffer);
            req.body[avatar.fieldname] = linkImage;
        }
    }
    if(req["files"].audio){
        for(const audio of req["files"].audio){
            const linkAudio =await cloud.upload(audio.buffer);
            req.body[audio.fieldname] = linkAudio;
        }
    }
    
    next();
}