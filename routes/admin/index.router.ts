import express,{Express} from 'express';
import topicRouter from './topics.router';
import homeRouter from './home.router';
import singer from './singer.router';

export default (app:Express)=>{
    app.use("/admin/home",homeRouter);
    app.use("/admin/topics",topicRouter);
    app.use("/admin/singers",singer);

}