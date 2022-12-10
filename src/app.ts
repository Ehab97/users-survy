import express from 'express';
import mongoose from 'mongoose';
import userAuthRoutes from './routes/userAuth';
// @ts-ignore
import {mongoAtlasURI} from '../config/keys';

//define express
const app = express();

//define constants
const PORT:number= process.env.PORT ?? 5000
const DB_URL: string = process.env.DB_URL ||'';
const CLUSTER_NAME: string | undefined = process.env.CLUSTER_NAME;
const DB_NAME: string | undefined = process.env.DB_NAME;
const DB_PASSWORD: string | undefined = process.env.DB_PASSWORD;
const DB_USER: string | undefined = process.env.DB_USER;
const mongoAtlas: string = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_NAME}.xthzqey.mongodb.net/${DB_NAME}`;

//middleware
//parse data
app.use(express.json())
//passport

//define routes
app.use(userAuthRoutes);


//34.132.134.162
//replit-verify=0871f3f3-42fc-448b-ba04-a2eef873ebeb
//https://users-survy.ehabreda.repl.co/
//connect db and run server
console.log(mongoAtlasURI);

mongoose.connect(mongoAtlasURI) //atlas
// mongoose.connect(DB_URL) //DB_URL || mongoAtlas
.then((res)=>{
    console.log('connected to db');
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
    })
})
.catch((err)=>console.log(err));
