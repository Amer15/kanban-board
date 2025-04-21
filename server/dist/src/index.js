"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./features/users/routes");
const routes_2 = require("./features/tasks/routes");
const error_handler_1 = require("./middlewares/error_handler");
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("combined"));
app.use((0, cors_1.default)());
app.use(express_1.default.json());
[routes_1.userRouter, routes_2.taskRouter].forEach((routes) => app.use("/api", routes));
app.use(error_handler_1.errorHandler);
app.listen(5000, () => console.log(`server stared!`));
