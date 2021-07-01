import { useState } from "react";
import "./NewTask.css";

function NewTask({ addTask }) {
  const [newTaskName, setNewTask] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();

    if (newTaskName.trim()) {
      addTask(newTaskName);
      setNewTask("");
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input
          className="addTaskInput"
          type="text"
          placeholder="Add New Todo..."
          size="57"
          maxLength="100"
          value={newTaskName}
          onChange={(event) => setNewTask(event.target.value)}
        />
        <button type="submit" className="add-btn">
          +
        </button>
      </form>
    </div>
  );
}

export default NewTask;
