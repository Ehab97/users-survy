"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todos_1 = __importDefault(require("./routes/todos"));
//define express
const app = (0, express_1.default)();
//define constants
const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 5000;
//parse data
app.use(express_1.default.json());
//define routes
app.use(todos_1.default);
//34.132.134.162
//replit-verify=0871f3f3-42fc-448b-ba04-a2eef873ebeb
//https://users-survy.ehabreda.repl.co/
//connect db and run server
app.listen(PORT);
