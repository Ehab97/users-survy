import express from 'express';
import mongoose from 'mongoose';
import session from "express-session";
import passport from 'passport';
import MongoStore from "connect-mongo";
require('./middleware/passport');
import userAuthRoutes from './routes/userAuth';
import userBillingRoutes from './routes/userBilling';

require('dotenv').config();
// @ts-ignore
import {mongoAtlasURI,cookieKey} from '../config/keys';
import {checkLogin} from "./middleware/loginAuth";


//define express
const app = express();

app.set('trust proxy', 1);
//define constants
const PORT:number= process.env.PORT ?? 5000
const DB_URL: string = process.env.DB_URL ||'';

//middleware
//parse data
app.use(express.json());
//passport

app.use(
    session({
        secret:process.env.COOKIE_KEY,
        cookie:{maxAge: 30*24 * 60 * 60 * 1000},
        resave:false,
        saveUninitialized:true,
        store: MongoStore.create({
            mongoUrl: mongoAtlasURI,
            // mongoUrl: DB_URL,
            ttl: 30 * 24 * 60 * 60 * 1000,
        })
    })
);

app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
})

//define routes
app.get('/', (req, res) => {
    res.send('Hello World! nodeJS');
})
app.use(userAuthRoutes);

app.use(userBillingRoutes);

console.log(DB_URL)
//connect db and run server
// mongoAtlasURI for atlas
// DB_URL for local compass db
mongoose.connect(mongoAtlasURI) //atlas
// mongoose.connect(DB_URL) //DB_URL || MongoCompass
.then((res)=>{
    console.log('connected to db');
    app.listen(PORT,()=>{
        console.log(`server running on port ${PORT}`);
    })
})
.catch((err)=>console.log(err));


