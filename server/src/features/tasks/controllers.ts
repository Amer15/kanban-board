import { validateSchema } from "@/utils/validation";
import { Request, Response } from "express";
import { createTaskSchema, updateTaskSchema } from "./validators";
import { db } from "@/db";
import { taskTable } from "@/db/models/task";
import { and, eq } from "drizzle-orm";

export const getAllTasks = async (_: Request, res: Response) => {
  const tasks = await db.query.taskTable.findMany({
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
};

export const getAllTasksByUser = async (req: Request, res: Response) => {
  const user_id = Number(req.user_id);
  const tasks = await db.query.taskTable.findMany({
    where: eq(taskTable.user_id, user_id),
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
};

export const getAllTodoTasksByUser = async (req: Request, res: Response) => {
  const user_id = Number(req.user_id);
  const tasks = await db.query.taskTable.findMany({
    where: and(
      eq(taskTable.user_id, user_id),
      eq(taskTable.task_status, "todo")
    ),
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
};
export const getAllInprogressTasksByUser = async (
  req: Request,
  res: Response
) => {
  const user_id = Number(req.user_id);
  const tasks = await db.query.taskTable.findMany({
    where: and(
      eq(taskTable.user_id, user_id),
      eq(taskTable.task_status, "in-progress")
    ),
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
};

export const getAllDoneTasksByUser = async (req: Request, res: Response) => {
  const user_id = Number(req.user_id);
  const tasks = await db.query.taskTable.findMany({
    where: and(
      eq(taskTable.user_id, user_id),
      eq(taskTable.task_status, "done")
    ),
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
};

export const createTask = async (req: Request, res: Response) => {
  const payload = validateSchema(createTaskSchema, req.body);
  await db.insert(taskTable).values(payload);

  res.status(201).json({
    message: "successfully created task",
  });
};

export const updateTask = async (req: Request, res: Response) => {
  const task_id = Number(req.query.task_id);
  const payload = validateSchema(updateTaskSchema, req.body);

  await db.update(taskTable).set(payload).where(eq(taskTable.id, task_id));

  res.status(201).json({
    message: "successfully updated task",
  });
};
