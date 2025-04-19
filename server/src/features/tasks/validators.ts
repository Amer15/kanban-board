import { taskStatus } from "@/types/enums";
import z from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(4).max(150),
  description: z.string().min(6).max(500).nullable(),
  user_id: z.number().min(1),
});

export const updateTaskSchema = z.object({
  title: z.string().min(4).max(150).optional(),
  description: z.string().min(6).max(500).nullable().optional(),
  task_status: z.enum(taskStatus),
  user_id: z.number().min(1).nullable().optional(),
});
