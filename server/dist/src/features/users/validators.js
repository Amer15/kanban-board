"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.registerUserSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.registerUserSchema = zod_1.default.object({
    full_name: zod_1.default.string().min(4).max(50),
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8).max(14),
});
exports.loginUserSchema = zod_1.default.object({
    email: zod_1.default.string().email(),
    password: zod_1.default.string().min(8).max(14),
});
