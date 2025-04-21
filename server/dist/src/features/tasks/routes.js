"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./controllers");
const validation_1 = require("../../middlewares/validation");
exports.taskRouter = express_1.default.Router();
exports.taskRouter.get("/tasks/all", validation_1.validateJWTToken, controllers_1.getAllTasks);
exports.taskRouter.get("/tasks/all-by-user", validation_1.validateJWTToken, controllers_1.getAllTasksByUser);
exports.taskRouter.get("/tasks/all-todo-tasks", validation_1.validateJWTToken, controllers_1.getAllTodoTasksByUser);
exports.taskRouter.get("/tasks/all-in-progress-tasks", validation_1.validateJWTToken, controllers_1.getAllInprogressTasksByUser);
exports.taskRouter.get("/tasks/all-done-tasks", validation_1.validateJWTToken, controllers_1.getAllDoneTasksByUser);
exports.taskRouter.post("/tasks/create", validation_1.validateJWTToken, controllers_1.createTask);
exports.taskRouter.put("/tasks/update", (0, validation_1.validateQueryId)("task_id"), validation_1.validateJWTToken, controllers_1.updateTask);
