"use client";
import { useState } from "react";

export default function TaskCard({ task, onDelete, onMove, onUpdate }: any) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  return (
    <div className="bg-white p-3 rounded shadow">
      {editing ? (
        <>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-1 w-full"
          />
          <button
            onClick={() => {
              onUpdate(task.id, title);
              setEditing(false);
            }}
            className="bg-green-500 text-white px-2 py-1 mt-2"
          >
            Save
          </button>
        </>
      ) : (
        <>
          <p>{task.title}</p>

          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-500 text-white px-2 py-1"
            >
              Edit
            </button>

            <button
              onClick={() => onDelete(task.id)}
              className="bg-red-500 text-white px-2 py-1"
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}