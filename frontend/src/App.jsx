import { useEffect, useState } from "react";
import "./App.css";
const API_URL = "http://localhost:5000/api/tasks";
function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Get tasks from backend
  async function fetchTasks() {
    try {
      setError("");
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error("Unable to load tasks");
      }
      const data = await response.json();
      setTasks(data);
    } catch {
      setError("Backend is not connected. check wheather Server is running or not.");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchTasks();
  }, []);
  // Add a new task
  async function addTask(event) {
    event.preventDefault();
    if (!title.trim()) return;
    try {
      setError("");
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        throw new Error("Unable to add task");
      }
      const newTask = await response.json();
      setTasks((previousTasks) => [...previousTasks, newTask]);
      setTitle("");
    } catch {
      setError("unable to add task. check Backend.");
    }
  }
  // Delete a task
  async function deleteTask(id) {
    try {
      setError("");
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Unable to delete task");
      }
      setTasks((previousTasks) =>
        previousTasks.filter((task) => task.id !== id)
      );
    } catch {
      setError("unable to delete task. check Backend.");
    }
  }
  return (
    <main className="app-container">
      <section className="task-card">
        <h1>Task Manager</h1>
        <p className="subtitle">Organize your day, one task at a time.</p>
        <form onSubmit={addTask} className="task-form">
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Enter a new task..."
            aria-label="New task"
          />
          <button type="submit">Add Task</button>
        </form>
        {error && <p className="error-message">{error}</p>}
        <h2>My Tasks ({tasks.length})</h2>
        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="empty-message">No tasks yet. Add your first task!</p>
        ) : (
          <ul className="task-list">
            {tasks.map((task) => (
              <li key={task.id} className="task-item">
                <span>{task.title}</span>
                <button
                  className="delete-button"
                  onClick={() => deleteTask(task.id)}
                  aria-label={`Delete ${task.title}`}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
export default App;