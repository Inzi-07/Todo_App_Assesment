import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import TaskListComponent from "./components/TaskListComponent";
import TaskFormComponent from "./components/TaskFormComponent";
import TaskService from "./services/TaskService";
import styles from "./App.module.css";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const fetchedTasks = await TaskService.getTasks();
        setTasks(fetchedTasks);
      } catch (error) {
        setMessage(error.message);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    try {
      const taskWithId = { ...newTask, id: uuidv4() };
      const savedTask = await TaskService.addTask(taskWithId);
      setTasks([...tasks, savedTask]);
      setIsFormVisible(false);
      setMessage("Task added successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleEditTask = async (updatedTask) => {
    try {
      const savedTask = await TaskService.updateTask(
        editingTask.id,
        updatedTask
      );
      const updatedTasks = tasks.map((task) =>
        task.id === savedTask.id ? savedTask : task
      );
      setTasks(updatedTasks);
      setEditingTask(null);
      setIsFormVisible(false);
      setMessage("Task updated successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleDeleteTask = async (taskToDelete) => {
    try {
      await TaskService.deleteTask(taskToDelete.id);
      const filteredTasks = tasks.filter((task) => task.id !== taskToDelete.id);
      setTasks(filteredTasks);
      setMessage("Task deleted successfully!");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleEditClick = (task) => {
    setEditingTask(task);
    setIsFormVisible(true);
  };

  const handleCancel = () => {
    setEditingTask(null);
    setIsFormVisible(false);
  };

  const handleAddUser = (newUser) => {
    if (!users.includes(newUser)) {
      setUsers([...users, newUser]);
    }
  };

  return (
    <div className={`container my-5 ${styles.container}`}>
      <h1 className="text-center">{`Task Manager`}</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setIsFormVisible(true)}
      >
        New Task
      </button>
      {message && <div className="alert alert-info">{message}</div>}
      <TaskListComponent
        tasks={tasks}
        onEdit={handleEditClick}
        onDelete={handleDeleteTask}
      />
      {isFormVisible && (
        <TaskFormComponent
          task={editingTask}
          onSubmit={editingTask ? handleEditTask : handleAddTask}
          onCancel={handleCancel}
          users={users}
          onAddUser={handleAddUser}
        />
      )}
    </div>
  );
};

export default App;
