import React, { useEffect, useState } from "react";
import { createTask, deleteTask, fetchTasks, updateTask } from "../api";
import trashIcon from "../../src/trash.svg";

interface Task {
  id: number;
  title: string;
  description?: string;
  isComplete: boolean;
}

interface Props {
  token: string;
}

const Tasks: React.FC<Props> = ({ token }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const loadTasks = async () => {
    const data = await fetchTasks(token);
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title) {
      await createTask(token, title, description);
      setTitle("");
      setDescription("");
      loadTasks();
    }
  };

  const handleToggleComplete = async (task: Task) => {
    await updateTask(token, task.id, { isComplete: !task.isComplete });
    loadTasks();
  };

  const handleDelete = async (id: number) => {
    await deleteTask(token, id);
    loadTasks();
  };

  return (
    <div className="centered-container">
      <div className="futuristic-card" style={{ width: "500px" }}>
        <h2>Tasks</h2>
        <form onSubmit={handleCreate}>
          <input
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button type="submit" className="btn">
            Add Task
          </button>
        </form>

        <ul className="task-list">
          {tasks.map((task) => (
            <li className="task-list-item" key={task.id}>
              <span
                style={{
                  textDecoration: task.isComplete ? "line-through" : "none",
                }}
              >
                {task.title}
                {task.description && ` - ${task.description}`}
              </span>
              <div className="task-actions">
                <button
                  className="btn"
                  onClick={() => handleToggleComplete(task)}
                >
                  {task.isComplete ? "Mark Incomplete" : "Mark Complete"}
                </button>
                <button
                  className="btn btn-delete"
                  onClick={() => handleDelete(task.id)}
                >
                  <img
                    src={trashIcon}
                    alt="Delete Task"
                    style={{ width: "16px", marginRight: "6px" }}
                  />
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
