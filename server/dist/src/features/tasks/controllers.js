"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTask = exports.createTask = exports.getAllDoneTasksByUser = exports.getAllInprogressTasksByUser = exports.getAllTodoTasksByUser = exports.getAllTasksByUser = exports.getAllTasks = void 0;
const validation_1 = require("../../utils/validation");
const validators_1 = require("./validators");
const db_1 = require("../../db");
const task_1 = require("../../db/models/task");
const drizzle_orm_1 = require("drizzle-orm");
const getAllTasks = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield db_1.db.query.taskTable.findMany({
        with: {
            user: {
                columns: {
                    password: false,
                    created_at: false,
                    updated_at: false,
                },
            },
        },
    });
    res.status(201).json({
        message: "successfully fetched tasks",
        tasks,
    });
});
exports.getAllTasks = getAllTasks;
const getAllTasksByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = Number(req.user_id);
    const tasks = yield db_1.db.query.taskTable.findMany({
        where: (0, drizzle_orm_1.eq)(task_1.taskTable.user_id, user_id),
        with: {
            user: {
                columns: {
                    password: false,
                    created_at: false,
                    updated_at: false,
                },
            },
        },
    });
    res.status(201).json({
        message: "successfully fetched your tasks",
        tasks,
    });
});
exports.getAllTasksByUser = getAllTasksByUser;
const getAllTodoTasksByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = Number(req.user_id);
    const tasks = yield db_1.db.query.taskTable.findMany({
        where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(task_1.taskTable.user_id, user_id), (0, drizzle_orm_1.eq)(task_1.taskTable.task_status, "todo")),
        with: {
            user: {
                columns: {
                    password: false,
                    created_at: false,
                    updated_at: false,
                },
            },
        },
    });
    res.status(201).json({
        message: "successfully fetched your tasks",
        tasks,
    });
});
exports.getAllTodoTasksByUser = getAllTodoTasksByUser;
const getAllInprogressTasksByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = Number(req.user_id);
    const tasks = yield db_1.db.query.taskTable.findMany({
        where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(task_1.taskTable.user_id, user_id), (0, drizzle_orm_1.eq)(task_1.taskTable.task_status, "in-progress")),
        with: {
            user: {
                columns: {
                    password: false,
                    created_at: false,
                    updated_at: false,
                },
            },
        },
    });
    res.status(201).json({
        message: "successfully fetched your tasks",
        tasks,
    });
});
exports.getAllInprogressTasksByUser = getAllInprogressTasksByUser;
const getAllDoneTasksByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user_id = Number(req.user_id);
    const tasks = yield db_1.db.query.taskTable.findMany({
        where: (0, drizzle_orm_1.and)((0, drizzle_orm_1.eq)(task_1.taskTable.user_id, user_id), (0, drizzle_orm_1.eq)(task_1.taskTable.task_status, "done")),
        with: {
            user: {
                columns: {
                    password: false,
                    created_at: false,
                    updated_at: false,
                },
            },
        },
    });
    res.status(201).json({
        message: "successfully fetched your tasks",
        tasks,
    });
});
exports.getAllDoneTasksByUser = getAllDoneTasksByUser;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = (0, validation_1.validateSchema)(validators_1.createTaskSchema, req.body);
    yield db_1.db.insert(task_1.taskTable).values(payload);
    res.status(201).json({
        message: "successfully created task",
    });
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task_id = Number(req.query.task_id);
    const payload = (0, validation_1.validateSchema)(validators_1.updateTaskSchema, req.body);
    yield db_1.db.update(task_1.taskTable).set(payload).where((0, drizzle_orm_1.eq)(task_1.taskTable.id, task_id));
    res.status(201).json({
        message: "successfully updated task",
    });
});
exports.updateTask = updateTask;
