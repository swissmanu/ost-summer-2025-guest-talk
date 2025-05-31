import Datastore from 'nedb-promises';

export interface Todo {
    _id: string;
    title: string;
    description?: string;
    importance: number;
    finished: boolean;
    dueDate?: Date;
    creationDate?: Date;
}

export interface TodoAddViewModel {
    title: string;
    description?: string;
    importance: number;
    finished: boolean;
    dueDate?: Date;
}


class TodoService {
    private db: Datastore;

    constructor(db) {
        const options = process.env.DB_TYPE === "FILE" ? {filename: './data/orders.db', autoload: true} : {}
        this.db = db || new Datastore(options);
    }

    async add(todo: TodoAddViewModel): Promise<Todo> {
        todo.finished = todo.finished || false;
        return await this.db.insert({...todo, creationDate: new Date()});
    }

    async update(todo: Partial<Todo>): Promise<Todo> {
        const current = this.get(todo._id);
        return await this.db.update<Todo>({_id: todo._id}, {...current, ...todo}, {returnUpdatedDocs: true});
    }

    async delete(id): Promise<boolean> {
        return await this.db.remove({_id: id}, {}) === 1;
    }

    async get(id) {
        return await this.db.findOne({_id: id});
    }

    async all(orderBy: { key: keyof Todo, direction: 1 | -1 } = {key: "creationDate", direction: -1},
              filterBy?: { key: keyof Todo, value: unknown }) {
        const filter = filterBy ? {[filterBy.key]: filterBy.value} : {}
        return await this.db.find(filter).sort({[orderBy.key]: orderBy.direction}).exec();
    }
}

export const todoService = new TodoService(undefined);

const init = async () => {

    if ((await todoService.all()).length == 0) {
        await todoService.add({title: "First Todo", finished: false, importance: 1})
        await todoService.add({title: "First Todo", finished: false, importance: 1})
    }
}
init();
