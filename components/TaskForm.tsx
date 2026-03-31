"use client";
import { useState } from "react";

export default function TaskForm({ onAdd }: any) {
  const [title, setTitle] = useState("");

  return (
    <div className="flex gap-2 mb-4">
      <input
        className="border p-2 w-full"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={() => {
          onAdd(title);
          setTitle("");
        }}
        className="bg-blue-500 text-white px-4"
      >
        Add
      </button>
    </div>
  );
}