import { Router } from 'express';
import { Todo } from '../models/todo';

type RequestBody = { text: string };
type RequestParams = { todoId: string | number };

let todos: Todo[] = [
    {
        id:12,
        text:'hello world'
    }
];
const router = Router();


router.get('/', (req, res, next) => {
    res.status(200).json({ msg:'hello All !!', todos: todos });
});

router.post('/todo', (req, res, next) => {
    const body = req.body as RequestBody;
    const newTodo: Todo = {
        id: new Date().getTime(),
        text: body.text
    };

    todos.push(newTodo);

    res.status(201).json({ message: 'Todo added', todo: newTodo, todos: todos });
});

router.put('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams;
    const tid = params.todoId;
    const body = req.body as RequestBody;
    const todoIndex = todos.findIndex(todo => todo.id === +tid);
    if (todoIndex >= 0) {
        todos[todoIndex] = { id: todos[todoIndex].id, text: body.text };
        return res.status(200).json({ message: 'Updated!' });
    }
    res.status(404).json({ message: 'Could not find todo!' });
});


router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params as RequestParams;
    const tid = params.todoId;
    todos = todos.filter(todo => todo.id !== +tid);
    res.status(200).json({ message: 'Todo deleted!', todos: todos });
})

export default router;
