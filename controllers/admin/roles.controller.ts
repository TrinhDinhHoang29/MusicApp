import express,{Express, Request,Response} from 'express';
import accountModel from '../../models/roles.model';
import md5 from 'md5';
export const index = async (req:Request,res:Response):Promise<void>=>{
    
    res.render("admin/pages/roles/index");
}
