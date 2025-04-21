import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { addTask } from "../../api-services/task-services";
import { useUserStore } from "../../store/user-store";
import { queryClient } from "../../main";
import { taskKeys } from "../../queries/task";
import { BeatLoader } from "react-spinners";

export const taskSchema = z.object({
  title: z
    .string()
    .min(6, "title must be at least 6 characters")
    .max(200, "title must not exceed 200 characters"),
  description: z
    .union([
      z
        .string()
        .min(6, "description must be at least 6 characters")
        .max(500, "description must not exceed 500 characters"),
      z.literal(""),
      z.null(),
      z.undefined(),
    ])
    .transform((val) => (val === "" ? null : val)),
});

export type TaskFormData = z.infer<typeof taskSchema>;

const TaskModal = ({ onClose }: { onClose: () => void }) => {
  const user = useUserStore((state) => state.user);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
  });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: TaskFormData) => {
    try {
      if (!user) {
        return;
      }
      setSubmitting(true);
      await addTask({
        ...data,
        description: data.description ?? null,
        user_id: user.id,
      });
      setSubmitting(false);
      reset();
      queryClient.invalidateQueries({ queryKey: taskKeys.byStatus("todo") });
      onClose();
    } catch (error) {
      setSubmitting(false);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-md w-[400px] shadow-lg relative">
        <h2 className="text-xl font-bold mb-4 font-poppins">Create Task</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              type="text"
              {...register("title")}
              placeholder="Title"
              className="w-full p-2 border rounded border-gray-400"
            />
            {errors.title && (
              <p className="text-sm text-red-500 mt-1">
                {errors.title.message}
              </p>
            )}
          </div>
          <div>
            <textarea
              {...register("description")}
              placeholder="Description (optional)"
              className="w-full p-2 border rounded border-gray-400"
              rows={4}
            />
            {errors.description && (
              <p className="text-sm text-red-500 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <div className="flex justify-between gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border  bg-slate-300 text-slate-500 hover:bg-slate-200 rounded-full text-base min-h-"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="px-4 py-2 bg-slate-900 text-slate-100 hover:bg-slate-700 rounded-full text-base min-h-10"
            >
              {submitting ? <BeatLoader size={8} color="#ffffff" /> : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;
