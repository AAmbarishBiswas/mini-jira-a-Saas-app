"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import AuthButton from "@/components/AuthButton";
import TaskForm from "@/components/TaskForm";
import TaskColumn from "@/components/TaskColumn";
import TaskCard from "@/components/TaskCard";

export default function Home() {
  const { data: session } = useSession();
  const [tasks, setTasks] = useState<any[]>([]);

 const fetchTasks = async () => {
  try {
    const res = await fetch("/api/tasks");

    if (!res.ok) {
      // This will catch the 405 and prevent the crash
      console.error("Server Error:", res.status);
      return;
    }

    const data = await res.json();
    setTasks(data);
  } catch (err) {
    console.error("Fetch error:", err);
  }
};

  
  const addTask = async (title: string) => {
  try {
    const res = await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("API Error:", data);
      alert("Failed to add task");
      return; // ❗ STOP here, don't throw
    }

    await fetchTasks();
  } catch (error) {
    console.error("Frontend Error:", error);
  }
};

   const deleteTask = async (id: string) => {
  try {
    if (!confirm("Are you sure you want to delete this task?")) return;

    const res = await fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      console.error("Delete failed");
      return;
    }

    await fetchTasks(); // refresh UI
  } catch (error) {
    console.error("Delete error:", error);
  }
};
  
  const moveTask = async (id: string, status: string) => {
    await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      body: JSON.stringify({ status }),
    });
    fetchTasks();
  };

  const updateTask = async (id: string, title: string) => {
  try {
    const res = await fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        // ✅ don't send status here unless needed
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Update failed:", data);
      return;
    }

    await fetchTasks();
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    if (session) fetchTasks();
  }, [session]);

  if (!session) {
    return (
      <div className="p-6">
        <AuthButton />
      </div>
    );
  }

  return (
    <div className="p-6">
      <AuthButton />
      <TaskForm onAdd={addTask} />

      <div className="grid grid-cols-3 gap-4">
         <TaskColumn
  title="TODO"
  tasks={tasks.filter((t) => t.status === "TODO")}
  onDelete={deleteTask}
  onMove={moveTask}
  onUpdate={updateTask}   // ✅ ADD THIS
/>

<TaskColumn
  title="IN PROGRESS"
  tasks={tasks.filter((t) => t.status === "IN_PROGRESS")}
  onDelete={deleteTask}
  onMove={moveTask}
  onUpdate={updateTask}   // ✅ ADD THIS
/>

<TaskColumn
  title="DONE"
  tasks={tasks.filter((t) => t.status === "DONE")}
  onDelete={deleteTask}
  onMove={moveTask}
  onUpdate={updateTask}   // ✅ ADD THIS
/>
      </div>
    </div>
  );
}