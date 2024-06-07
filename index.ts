import express,{Express, Request,Response} from 'express';
import doenv from 'dotenv';
import * as database from './config/database';
import routerClient from './routes/client/index.router';


doenv.config();
database.connect();


const app:Express = express();
const port:number|string = process.env.PORT||8080;



app.set("views","./views");
app.set("view engine","pug");
app.use(express.static(`${__dirname}/public`));

routerClient(app);


app.listen(port,()=>{
    console.log("App run on port: "+port);
})