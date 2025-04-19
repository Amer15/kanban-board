import { CirclePlus } from "lucide-react";
import { ColumnProps } from "../../types";
import TaskCard from "./task-card";
import { useDroppable } from "@dnd-kit/core";
import { useTasksByStatus } from "../../queries/task";
import { useState } from "react";
import TaskModal from "../modal/task-modal";

const Column = ({ column }: ColumnProps) => {
  const { isLoading, data } = useTasksByStatus(column.type);
  const [showTaskModal, setShowTaskModal] = useState(false);
  const { setNodeRef } = useDroppable({
    id: column.type,
    data: {
      type: "Column",
      column,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className="flex-1 bg-lightGray shadow-md p-2 border border-gray-300 rounded-xl"
    >
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <h3 className="text-base md:text-lg text-slate-700 font-poppins font-bold">
            {column.title}
          </h3>
          <span className="bg-slate-900 text-slate-200 rounded-full flex justify-center items-center text-xs px-2 py-1">
            {data?.length ?? 0}
          </span>
        </div>
        {column.type === "todo" && (
          <CirclePlus
            className="text-gray-500 hover:text-gray-800 cursor-pointer transition-colors duration-300"
            onClick={() => setShowTaskModal(true)}
          />
        )}
      </div>
      <div className="flex-col gap-2 flex-grow flex-1 overflow-x-hidden overflow-y-auto min-h-32">
        {isLoading && <p>loading..</p>}
        {!isLoading && !data && <p>failed to load data</p>}
        {data && data.length === 0 && (
          <p className="text-xs md:text-sm text-slate-600">
            {column.type === "done"
              ? "no completed tasks"
              : column.type === "todo"
              ? "no pending tasks"
              : "no ongoing tasks"}
          </p>
        )}
        {data &&
          data.length > 0 &&
          data.map((task) => <TaskCard key={task.id} task={task} />)}
      </div>
      {showTaskModal && <TaskModal onClose={() => setShowTaskModal(false)} />}
    </div>
  );
};

export default Column;
