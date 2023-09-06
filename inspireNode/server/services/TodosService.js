import { dbContext } from "../db/DbContext.js";

class TodosService {


    async createTodo(body) {
        const newTodo = await dbContext.Todos.create(body)
        return newTodo
    }

    async getTodos(userId) {
        const todos = await dbContext.Todos.find({ creatorId: userId })
        return todos
    }

    async editTodo(todoId, updates) {
        const originalTodo = await dbContext.Todos.findById(todoId)
        originalTodo.completed = updates.completed ? updates.completed : originalTodo.completed
        // originalTodo.completed = updates.completed || originalTodo


        await originalTodo.save()
        return originalTodo
    }

}

export const todosService = new TodosService();