import {Request, Response} from 'express';
import {Todo, todoService} from "../services/todo-service";

export class IndexController {
    async index(req: Request, res: Response) {
        const sorting = [
            {key: 'title', label: 'Name'},
            {key: 'dueDate', label: 'Due Date'},
            {key: 'creationDate', label: 'Creation Date'},
            {key: 'importance', label: 'Importance'}];
        const sortingViewModel = sorting.map(sort => {
            const current = sort.key == req.settings.orderBy;
            return {
                key: sort.key,
                label: sort.label,
                current: current,
                direction: current ? -req.settings.orderDirection : 1,
            }
        });

        const todos = await todoService.all(
            req.settings.orderBy ? {
                key: req.settings.orderBy,
                direction: req.settings.orderDirection
            } : undefined,
            req.settings.filter ? {key: "finished", value: false} : undefined)

        res.render("index", {
            ...IndexController.defaultParams(req),
            data: "Hello World",
            dark: true,
            todos: todos,
            sort: sortingViewModel,
            filter: req.settings.filter
        });
    };

    async add(req: Request, res: Response) {
        res.render("todo", {
            ...IndexController.defaultParams(req)
        });
    };

    async handleAdd(req: Request, res: Response) {
        const {title, importance, dueDate, finished, description} = req.body;
        const todo = await todoService.add({
            title, importance, dueDate,
            finished: finished == 'selected',
            description
        });

        IndexController.handleSave(req, res, todo);
    };

    async update(req: Request, res: Response) {
        const todo = await todoService.get(req.params.id)
        res.render("todo", {
            ...IndexController.defaultParams(req),
            todo
        });
    };

    async handleUpdate(req: Request, res: Response) {
        const {title, importance, dueDate, finished, description} = req.body;
        const todo = await todoService.update({
            _id: req.params.id,
            title,
            importance,
            dueDate,
            finished: finished == 'selected',
            description
        })

        IndexController.handleSave(req, res, todo);
    };


    private static defaultParams(req: Request) {
        return {theme: req.settings.theme}
    }

    private static handleSave(req: Request, res: Response, todo: Todo) {
        if (req.body.save_redirect) {
            res.redirect(303, `/`)
        } else {
            res.redirect(303, `/todo/${todo._id}`)
        }
    }
}

export const indexController = new IndexController();
