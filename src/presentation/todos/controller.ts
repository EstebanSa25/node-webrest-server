import { Request, Response } from 'express';

const todos = [
    { id: 1, text: 'Todo 1', completedAt: new Date() },
    { id: 2, text: 'Todo 2', completedAt: null },
    { id: 3, text: 'Todo 3', completedAt: new Date() },
];
export class TodosController {
    //*DI
    constructor() {}
    public getTodos = (req: Request, res: Response) => {
        return res.json(todos);
    };
    public getTodoById = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id))
            return res
                .status(400)
                .json({ error: 'ID argument is no a number' });
        const todo = todos.find((todo) => todo.id === id);
        todo
            ? res.json(todo)
            : res.status(404).json({ error: `Todo with id ${id} not found` });
    };
    public createTodo = (req: Request, res: Response) => {
        const { text } = req.body;
        !text && res.status(400).json({ error: 'Text argument is required' });
        const newTodo = {
            id: todos.length + 1,
            text,
            completedAt: null,
        };
        todos.push(newTodo);
        res.json(newTodo);
    };
    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        if (isNaN(id))
            return res
                .status(400)
                .json({ error: 'ID argument is no a number' });
        const todo = todos.find((todo) => todo.id === id);
        !todo &&
            res.status(404).json({ error: `Todo with id ${id} not found` });
        const { text, completedAt } = req.body;
        ``;
        if (todo) {
            todo.text = text || todo.text;
            completedAt === 'null'
                ? (todo.completedAt = null)
                : (todo.completedAt = new Date(
                      completedAt || todo.completedAt
                  ));
        }
        res.json(todo);
    };
}
