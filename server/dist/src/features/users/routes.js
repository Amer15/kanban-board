"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("./controllers");
exports.userRouter = express_1.default.Router();
exports.userRouter.get("/users/all", controllers_1.getAllUsers);
exports.userRouter.post("/users/register", controllers_1.register);
exports.userRouter.post("/users/login", controllers_1.login);
