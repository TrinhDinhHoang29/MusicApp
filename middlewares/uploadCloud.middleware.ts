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
    if(req["files"]){   
        const linkImage =await cloud.upload(req["files"].avatar[0].buffer);
        req.body[req["files"].avatar[0].fieldname] = linkImage;
        const linkAudio =await cloud.upload(req["files"].audio[0].buffer);
        req.body[req["files"].audio[0].fieldname] = linkAudio;  
    }
    next();
}