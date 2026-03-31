"use client";

import TaskCard from "./TaskCard";

type Task = {
  id: string;
  title: string;
  status: string;
};

type Props = {
  title: string;
  tasks: Task[];
  onDelete: (id: string) => void;
  onMove: (id: string, status: string) => void;
  onUpdate: (id: string, title: string) => void;
};

export default function TaskColumn({
  title,
  tasks,
  onDelete,
  onMove,
  onUpdate,
}: Props) {
  return (
    <div className="bg-gray-100 p-4 rounded-xl min-h-[300px]">
      {/* Column Title */}
      <h2 className="text-lg font-bold mb-3">{title}</h2>

      {/* Tasks */}
      <div className="flex flex-col gap-3">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-sm">No tasks</p>
        ) : (
          tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={onDelete}
              onMove={onMove}
              onUpdate={onUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
}