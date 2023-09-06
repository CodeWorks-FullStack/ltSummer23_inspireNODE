import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { todosService } from "../services/TodosService.js";

export class TodosController extends BaseController {
    constructor() {
        super('api/todos')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTodo)
            .get('', this.getTodos)
            .put('/:todoId', this.editTodo)

    }
    async editTodo(req, res, next) {
        try {
            const todoId = req.params.todoId
            const updates = req.body
            const editedTodo = await todosService.editTodo(todoId, updates)
            return res.send(editedTodo)
        } catch (error) {
            next(error)
        }
    }

    async createTodo(request, response, next) {
        try {
            const userId = request.userInfo.id
            const body = request.body
            body.creatorId = userId
            const newTodo = await todosService.createTodo(body)
            response.send(newTodo)
        } catch (error) {
            next(error)
        }
    }

    async getTodos(req, res, next) {
        try {
            const userId = req.userInfo.id
            const todos = await todosService.getTodos(userId)
            return res.send(todos)
        } catch (error) {
            next(error)
        }
    }



}