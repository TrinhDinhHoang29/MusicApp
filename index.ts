import express,{Express,} from 'express';
import doenv from 'dotenv';
import * as database from './config/database';
import routerClient from './routes/client/index.router';
import routerAdmin from './routes/admin/index.router';
import path from 'path';



doenv.config();
database.connect();


const app:Express = express();
const port:number|string = process.env.PORT||8080;



app.set("views","./views");
app.set("view engine","pug");
app.use(express.static(`${__dirname}/public`));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/tinymce', express.static(path.join(__dirname, 'node_modules', 'tinymce')));


routerClient(app);
routerAdmin(app);

app.listen(port,()=>{
    console.log("App run on port: "+process.env.PORT);
})