import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  TouchSensor,
  useSensors,
  useSensor,
  MouseSensor,
} from "@dnd-kit/core";
import Column from "../components/kanban/column";
import { ColumnType, Task } from "../types";
import { useState } from "react";
import TaskCard from "../components/kanban/task-card";
import Navbar from "../components/common/navbar";
import { toast } from "sonner";
import { updateTaskStatus } from "../api-services/task-services";
import { queryClient } from "../main";
import { taskKeys } from "../queries/task";

const columns: ColumnType[] = [
  {
    type: "todo",
    title: "Todo",
  },
  {
    type: "in-progress",
    title: "In Progress",
  },
  {
    type: "done",
    title: "Done",
  },
];

const Homepage = () => {
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const sensors = useSensors(useSensor(TouchSensor), useSensor(MouseSensor));

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
    }
  };

  const onDragEnd = async (event: DragEndEvent) => {
    setActiveTask(null);
    const { active, over } = event;

    if (!over || !active.data.current?.task) return;

    const activeTask = active.data.current.task as Task;
    const overId = over.id as Task["task_status"];
    if (active.data.current?.task.task_status === overId) {
      return;
    }

    // Optimistically update UI
    queryClient.setQueryData<Task[]>(
      taskKeys.byStatus(activeTask.task_status),
      (old) => old?.filter((t) => t.id !== activeTask.id) || []
    );

    queryClient.setQueryData<Task[]>(taskKeys.byStatus(overId), (old) => [
      ...(old || []),
      { ...activeTask, task_status: overId },
    ]);

    try {
      await updateTaskStatus({ task_id: activeTask.id, task_status: overId });
      // 2. Invalidate only the affected queries
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: taskKeys.byStatus(activeTask.task_status),
        }),
        queryClient.invalidateQueries({
          queryKey: taskKeys.byStatus(overId),
        }),
      ]);
      toast.success(`task marked as ${overId}`);
    } catch (error) {
      toast.error(`failed to mark task ${overId}`);
      // Rollback optimistic update
      queryClient.setQueryData<Task[]>(
        taskKeys.byStatus(activeTask.task_status),
        (old) => [...(old || []), activeTask]
      );

      queryClient.setQueryData<Task[]>(
        taskKeys.byStatus(overId),
        (old) => old?.filter((t) => t.id !== activeTask.id) || []
      );
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen font-poppins">
        <DndContext
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          sensors={sensors}
        >
          <div className="max-w-6xl mx-2 md:mx-auto flex flex-col md:flex-row gap-6 min-h-80 my-5">
            {columns.map((col, i) => (
              <Column key={i} column={col} />
            ))}
          </div>
          <DragOverlay>
            {activeTask && <TaskCard task={activeTask} />}
          </DragOverlay>
        </DndContext>
      </section>
    </>
  );
};

export default Homepage;
