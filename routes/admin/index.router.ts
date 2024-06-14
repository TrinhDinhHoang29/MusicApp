import express,{Express} from 'express';
import topicRouter from './topics.router';
import homeRouter from './home.router';
import singer from './singer.router';
import songs from './songs.router';
import accounts from './account.router';

export default (app:Express)=>{
    app.use("/admin/home",homeRouter);
    app.use("/admin/topics",topicRouter);
    app.use("/admin/singers",singer);
    app.use("/admin/songs",songs);
    app.use("/admin/accounts",accounts);



}