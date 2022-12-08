import express from 'express';
import userRoutes from './routes/user';


//define express
const app = express();

//define constants
const PORT:number= process.env.PORT ?? 5000


//middleware
//parse data
app.use(express.json())
//passport

//define routes
app.use(userRoutes);


//34.132.134.162
//replit-verify=0871f3f3-42fc-448b-ba04-a2eef873ebeb
//https://users-survy.ehabreda.repl.co/
//connect db and run server
app.listen(PORT);