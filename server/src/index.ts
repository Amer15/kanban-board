import express from "express";
import morgan from "morgan";
import cors from "cors";
import "express-async-errors"
import { userRouter } from "@/features/users/routes";
import { taskRouter } from "@/features/tasks/routes";
import { errorHandler } from "./middlewares/error_handler";

const app = express();

app.use(morgan("combined"));
app.use(cors());
app.use(express.json());

[userRouter, taskRouter].forEach((routes) => app.use("/api", routes));

app.use(errorHandler);

app.listen(5000, () => console.log(`server stared!`));
