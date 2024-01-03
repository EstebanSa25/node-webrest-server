import { Request, Response } from 'express';
import { prisma } from '../../data/postgres';
import { CreateTodoDto, UpdateTodoDto } from '../../domain/dtos';
import { TodoRepository } from '../../domain/respositories/todo.repository';

export class TodosController {
    //* DI
    constructor(private readonly TodoRepository: TodoRepository) {}

    public getTodos = async (req: Request, res: Response) => {
        const todos = await this.TodoRepository.getAll();
        return res.json(todos);
    };

    public getTodoById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        try {
            const todo = await this.TodoRepository.findById(id);
            return res.json(todo);
        } catch (error) {
            res.status(400).json({ error });
        }
    };

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if (error) return res.status(400).json({ error });
        const createTodo = await this.TodoRepository.create(createTodoDto!);
        res.json(createTodo);
    };

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const [error, updateTodoDto] = UpdateTodoDto.create({
            ...req.body,
            id,
        });
        if (error) return res.status(400).json({ error });
        const updatedTodo = await this.TodoRepository.updateById(
            updateTodoDto!
        );
        res.json(updatedTodo);
    };

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        const deletedTodo = await this.TodoRepository.deleteById(id);
        return res.json(deletedTodo);
    };
}
