// queries/task.ts
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../config/axios-config";
import { Task } from "../types";

export const taskKeys = {
  all: ["tasks"],
  byStatus: (status: string) => ["tasks", status],
} as const;

export const useTasksByStatus = (status: "todo" | "in-progress" | "done") =>
  useQuery({
    queryKey: taskKeys.byStatus(status),
    queryFn: async () => {
      const { data } = await axiosInstance.get<{ tasks: Task[] }>(
        `/tasks/all-${status}-tasks`
      );
      return data.tasks;
    },
  });
