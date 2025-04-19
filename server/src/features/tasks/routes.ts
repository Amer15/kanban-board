import express from "express";
import {
  getAllTasks,
  getAllTasksByUser,
  getAllTodoTasksByUser,
  getAllDoneTasksByUser,
  getAllInprogressTasksByUser,
  createTask,
  updateTask,
} from "./controllers";
import { validateJWTToken, validateQueryId } from "@/middlewares/validation";
export const taskRouter = express.Router();

taskRouter.get("/tasks/all", validateJWTToken, getAllTasks);
taskRouter.get("/tasks/all-by-user", validateJWTToken, getAllTasksByUser);
taskRouter.get(
  "/tasks/all-todo-tasks",
  validateJWTToken,
  getAllTodoTasksByUser
);
taskRouter.get(
  "/tasks/all-in-progress-tasks",
  validateJWTToken,
  getAllInprogressTasksByUser
);
taskRouter.get(
  "/tasks/all-done-tasks",
  validateJWTToken,
  getAllDoneTasksByUser
);
taskRouter.post("/tasks/create", validateJWTToken, createTask);
taskRouter.put(
  "/tasks/update",
  validateQueryId("task_id"),
  validateJWTToken,
  updateTask
);
