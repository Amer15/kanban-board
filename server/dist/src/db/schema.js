"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schemas = void 0;
const user_1 = require("./models/user");
const task_1 = require("./models/task");
exports.schemas = {
    userTable: user_1.userTable,
    userTableRelations: user_1.userTableRelations,
    taskTable: task_1.taskTable,
    taskRelations: task_1.taskRelations,
};
