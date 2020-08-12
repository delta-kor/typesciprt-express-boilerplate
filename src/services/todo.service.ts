export interface Todo {
    id: number;
    content: string;
    finished: boolean;
}

class TodoService {

    private todos: Map<number, Todo>;

    constructor() {
        const todos = [
            {
                id: 0,
                content: 'Bake cookies',
                finished: true
            },
            {
                id: 1,
                content: 'See the doctor',
                finished: true
            },
            {
                id: 2,
                content: 'Go shopping',
                finished: false
            },
            {
                id: 3,
                content: 'Do laundry',
                finished: false
            },
            {
                id: 4,
                content: 'Learn angular',
                finished: false
            },
        ];
        this.todos = new Map();
        for(let todo of todos) this.todos.set(todo.id, todo);
    }

    getTodos(): Todo[] {
        return [...this.todos.values()];
    }

}

const todoService = new TodoService();
export { todoService };
