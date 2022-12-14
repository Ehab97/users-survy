"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("passport"));
require('./middleware/passport');
const userAuth_1 = __importDefault(require("./routes/userAuth"));
require('dotenv').config();
// @ts-ignore
const keys_1 = require("../config/keys");
//define express
const app = (0, express_1.default)();
//define constants
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
const DB_URL = process.env.DB_URL || '';
//middleware
//parse data
app.use(express_1.default.json());
//passport
app.use((0, express_session_1.default)({
    secret: process.env.COOKIE_KEY,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
    resave: false,
    saveUninitialized: true
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    next();
});
//define routes
app.use(userAuth_1.default);
//34.132.134.162
//replit-verify=0871f3f3-42fc-448b-ba04-a2eef873ebeb
//replit-verify=0871f3f3-42fc-448b-ba04-a2eef873ebeb
//connect db and run server
// mongoAtlasURI for atlas
// DB_URL for local compass db
mongoose_1.default.connect(keys_1.mongoAtlasURI) //atlas
    // mongoose.connect(DB_URL) //DB_URL || mongocompass
    .then((res) => {
    console.log('connected to db');
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
})
    .catch((err) => console.log(err));
