import React, { useState } from "react";
import styles from "./styles/TaskForm.module.css";

const TaskFormComponent = ({ task, onSubmit, onCancel, users, onAddUser }) => {
  const [assignedTo, setAssignedTo] = useState(task ? task.assignedTo : "");
  const [status, setStatus] = useState(task ? task.status : "Not Started");
  const [dueDate, setDueDate] = useState(task ? task.dueDate : "");
  const [priority, setPriority] = useState(task ? task.priority : "Normal");
  const [comments, setComments] = useState(task ? task.comments : "");
  const [newUser, setNewUser] = useState("");
  const [newUserMessage, setNewUserMessage] = useState("");
  const [formError, setFormError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (new Date(dueDate) < new Date()) {
      setFormError("Due date cannot be in the past.");
      return;
    }
    onSubmit({
      assignedTo,
      status,
      dueDate,
      priority,
      comments,
    });

    setAssignedTo("");
    setStatus("Not Started");
    setDueDate("");
    setPriority("Normal");
    setComments("");
    setFormError("");
  };

  const handleAddNewUser = () => {
    if (newUser.trim()) {
      onAddUser(newUser);
      setAssignedTo(newUser);
      setNewUserMessage(`User ${newUser} added successfully!`);
      setNewUser("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`bg-light p-4 border rounded ${styles.taskForm}`}
    >
      <h2 className="text-center mb-4">{task ? "Edit Task" : "Create Task"}</h2>
      <div className="mb-3">
        <label className="form-label">Assigned To</label>
        <select
          className="form-select"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          required
        >
          <option value="">Select User</option>
          {users.map((user, index) => (
            <option key={index} value={user}>
              {user}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Add New User</label>
        <input
          type="text"
          className={`form-control ${styles.inputField}`}
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button
          type="button"
          className={`btn btn-secondary mt-2 ${styles.addButton}`}
          onClick={handleAddNewUser}
        >
          Add User
        </button>
        {newUserMessage && (
          <div className="alert alert-success mt-2">{newUserMessage}</div>
        )}
      </div>

      <div className="mb-3">
        <label className="form-label">Status</label>
        <select
          className="form-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          required
        >
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Due Date</label>
        <input
          type="date"
          className={`form-control ${styles.inputField}`}
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Priority</label>
        <select
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          required
        >
          <option value="Low">Low</option>
          <option value="Normal">Normal</option>
          <option value="High">High</option>
        </select>
      </div>

      <div className="mb-3">
        <label className="form-label">Comments</label>
        <textarea
          className={`form-control ${styles.inputField}`}
          value={comments}
          onChange={(e) => setComments(e.target.value)}
          rows="3"
        />
      </div>

      {formError && <div className="alert alert-danger">{formError}</div>}

      <div className="d-flex justify-content-between">
        <button
          type="button"
          className={`btn btn-outline-secondary me-2 ${styles.cancelButton}`}
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`btn btn-primary ${styles.saveButton}`}
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default TaskFormComponent;
