import React from "react";
import styles from "./styles/TaskList.module.css";

const TaskListComponent = ({ tasks, onEdit, onDelete }) => {
  return (
    <div className={styles.table_container}>
      {tasks.length > 0 ? (
        <table className={`table table-striped ${styles.table}`}>
          <thead className="table-dark">
            <tr>
              <th>Assigned To</th>
              <th>Status</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Comments</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.assignedTo}</td>
                <td>{task.status}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>{task.priority}</td>
                <td>{task.comments}</td>
                <td>
                  <button
                    className={`btn btn-warning me-2 ${styles.btn}`}
                    onClick={() => onEdit(task)}
                    aria-label={`Edit task assigned to ${task.assignedTo}`}
                  >
                    Edit
                  </button>
                  <button
                    className={`btn btn-danger ${styles.btn}`}
                    onClick={() => onDelete(task)}
                    aria-label={`Delete task assigned to ${task.assignedTo}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={`text-center ${styles.no_tasks}`}>
          No tasks available. Please add a task.
        </p>
      )}
    </div>
  );
};

export default TaskListComponent;
