import express from 'express';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session';
import session from "express-session";
import passport from 'passport';
require('./middleware/passport');
import userAuthRoutes from './routes/userAuth';
// @ts-ignore
import {mongoAtlasURI,cookieKey} from '../config/keys';

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

//passport
// app.use(
//     cookieSession({
//         maxAge: 30*24 * 60 * 60 * 1000,
//         keys:[cookieKey]
//     })
// )
app.use(
    session({
        secret:'this_is_a_cookie_key_emaily_app_2022',
        cookie:{maxAge: 30*24 * 60 * 60 * 1000},
        resave:false,
        saveUninitialized:true
    })
);
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
//define routes
app.use(userAuthRoutes);


//34.132.134.162
//replit-verify=0871f3f3-42fc-448b-ba04-a2eef873ebeb
//https://users-survy.ehabreda.repl.co/
//connect db and run server
console.log(mongoAtlasURI);

// mongoose.connect(mongoAtlasURI) //atlas
mongoose.connect(DB_URL) //DB_URL || mongocompass
.then((res)=>{
    console.log('connected to db');
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
    })
})
.catch((err)=>console.log(err));
