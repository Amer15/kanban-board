"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskSchema = exports.createTaskSchema = void 0;
const enums_1 = require("../../types/enums");
const zod_1 = __importDefault(require("zod"));
exports.createTaskSchema = zod_1.default.object({
    title: zod_1.default.string().min(4).max(150),
    description: zod_1.default.string().min(6).max(500).nullable(),
    user_id: zod_1.default.number().min(1),
});
exports.updateTaskSchema = zod_1.default.object({
    title: zod_1.default.string().min(4).max(150).optional(),
    description: zod_1.default.string().min(6).max(500).nullable().optional(),
    task_status: zod_1.default.enum(enums_1.taskStatus),
    user_id: zod_1.default.number().min(1).nullable().optional(),
});
