import { TaskCardProps } from "../../types";
import { CSS } from "@dnd-kit/utilities";
import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task }: TaskCardProps) => {
  const { setNodeRef, attributes, transform, isDragging, listeners } =
    useDraggable({
      id: task.id,
      data: {
        type: "Task",
        task,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        className="bg-gray-100 p-2 rounded-xl my-2 border border-gray-400 h-24 opacity-60"
      >
        {" "}
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white p-2 rounded-xl my-2 border border-gray-100 hover:border-gray-400 transition-all duration-300"
    >
      <div className="py-2">
        <h3 className="text-sm md:text-base font-semibold font-poppins text-slate-900 mb-1">
          {task.title}
        </h3>
        {task.description && (
          <p className="text-xs md:text-sm font-poppins text-slate-600">
            {task.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default TaskCard;
