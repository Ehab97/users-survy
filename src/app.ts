import express from 'express';
import todosRoutes from './routes/todos';

//define express
const app = express();

//define constants
const PORT:number= process.env.PORT ?? 5000

//parse data
app.use(express.json())


//define routes
app.use(todosRoutes)


//34.132.134.162
//replit-verify=0871f3f3-42fc-448b-ba04-a2eef873ebeb
//https://users-survy.ehabreda.repl.co/
//connect db and run server
app.listen(PORT);