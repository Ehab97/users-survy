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



//connect db and run server
app.listen(PORT);