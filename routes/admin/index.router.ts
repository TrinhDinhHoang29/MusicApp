import express,{Express} from 'express';
import topicRouter from './topics.router';
import homeRouter from './home.router';
import singer from './singer.router';
import songs from './songs.router';
import accounts from './account.router';
import auth from './auth.router';
import * as authMiddleware from '../../middlewares/auth.middleware';
import profile from './profile.router';
import roles from './roles.router';
import otps from './otp.router';


export default (app:Express)=>{
    app.use("/admin/home",authMiddleware.checkToken,homeRouter);
    app.use("/admin/topics",authMiddleware.checkToken,topicRouter);
    app.use("/admin/singers",authMiddleware.checkToken,singer);
    app.use("/admin/songs",authMiddleware.checkToken,songs);
    app.use("/admin/accounts",authMiddleware.checkToken,accounts);
    app.use("/admin/auth",auth);
    app.use("/admin/profile",authMiddleware.checkToken,profile);
    app.use("/admin/roles",authMiddleware.checkToken,roles);
    app.use("/admin/otps",authMiddleware.checkToken,otps);





}