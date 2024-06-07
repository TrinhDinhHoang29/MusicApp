import topicRouter from './topics.router';

export default (app)=>{
    app.use("/topics",topicRouter);
}