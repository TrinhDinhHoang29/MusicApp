import express,{Express} from 'express';
import topicRouter from './topics.router';
import homeRouter from './home.router';

export default (app:Express)=>{
    app.use("/admin/home",homeRouter);
    app.use("/admin/topics",topicRouter);
}