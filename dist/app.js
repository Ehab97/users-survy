"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const userAuth_1 = __importDefault(require("./routes/userAuth"));
// @ts-ignore
const keys_1 = require("../config/keys");
//define express
const app = (0, express_1.default)();
//define constants
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
const DB_URL = process.env.DB_URL || '';
const CLUSTER_NAME = process.env.CLUSTER_NAME;
const DB_NAME = process.env.DB_NAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_USER = process.env.DB_USER;
const mongoAtlas = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER_NAME}.xthzqey.mongodb.net/${DB_NAME}`;
//middleware
//parse data
app.use(express_1.default.json());
//passport
//define routes
app.use(userAuth_1.default);
//34.132.134.162
//replit-verify=0871f3f3-42fc-448b-ba04-a2eef873ebeb
//https://users-survy.ehabreda.repl.co/
//connect db and run server
console.log(keys_1.mongoAtlasURI);
mongoose_1.default.connect(keys_1.mongoAtlasURI) //atlas
    // mongoose.connect(DB_URL) //DB_URL || mongoAtlas
    .then((res) => {
    console.log('connected to db');
    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`);
    });
})
    .catch((err) => console.log(err));
