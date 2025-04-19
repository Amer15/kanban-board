import { AxiosError } from "axios";
import { axiosInstance } from "../config/axios-config";

export const addTask = async ({
  title,
  description,
  user_id,
}: {
  title: string;
  description: string | null;
  user_id: number;
}) => {
  try {
    await axiosInstance.post(`/tasks/create`, {
      title,
      description,
      user_id,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(
          error.message ?? "something went wrong! failed to add task"
        );
      }
    }
  }
};

export const updateTaskStatus = async ({
  task_id,
  task_status,
}: {
  task_id: number;
  task_status: "todo" | "in-progress" | "done";
}) => {
  try {
    await axiosInstance.put(
      `/tasks/update`,
      {
        task_status,
      },
      { params: { task_id } }
    );
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      } else {
        throw new Error(
          error.message ?? "something went wrong! failed to update task status"
        );
      }
    }
  }
};
