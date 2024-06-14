import express,{Express} from 'express';
import topicRouter from './topics.router';
import homeRouter from './home.router';
import songRouter from './songs.router';


export default (app:Express)=>{
    app.use("/home",homeRouter);
    app.use("/topics",topicRouter);
    app.use("/songs",songRouter);

}