export interface Todo {
    id: number;
    content: string;
    isFinished: boolean;
}

class TodoService {

    private todos: Todo[];

    constructor() {
        this.todos = [
            {
                id: 0,
                content: 'Bake cookies',
                isFinished: true
            },
            {
                id: 1,
                content: 'See the doctor',
                isFinished: true
            },
            {
                id: 2,
                content: 'Go shopping',
                isFinished: false
            },
            {
                id: 3,
                content: 'Do laundry',
                isFinished: false
            },
            {
                id: 4,
                content: 'Learn angular',
                isFinished: false
            },
        ];
    }

    getTodos(): Todo[] {
        return this.todos;
    }

}

const todoService = new TodoService();
export { todoService };
