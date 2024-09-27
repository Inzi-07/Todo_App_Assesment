const API_URL = "http://localhost:5000/tasks";

const TaskService = {
  getTasks: async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to fetch tasks: ${response.status} - ${error}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error fetching tasks: ${error.message}`);
    }
  },

  addTask: async (task) => {
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to add task: ${response.status} - ${error}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error adding task: ${error.message}`);
    }
  },

  updateTask: async (taskId, updatedTask) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to update task: ${response.status} - ${error}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error updating task: ${error.message}`);
    }
  },

  deleteTask: async (taskId) => {
    try {
      const response = await fetch(`${API_URL}/${taskId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Failed to delete task: ${response.status} - ${error}`);
      }
      return await response.json();
    } catch (error) {
      throw new Error(`Error deleting task: ${error.message}`);
    }
  },
};

export default TaskService;
