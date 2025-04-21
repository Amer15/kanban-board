import express from "express";
import { login, register, getAllUsers, getNewAccessToken } from "./controllers";
export const userRouter = express.Router();

userRouter.get("/users/all", getAllUsers);
userRouter.post("/users/register", register);
userRouter.post("/users/login", login);
userRouter.post("/users/refresh-token", getNewAccessToken);
