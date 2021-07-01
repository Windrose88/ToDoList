import { useState, useContext } from "react";
import "./Task.css";
import Context from "./context";

function Task({ task }) {
  const [editMode, setEditMode] = useState(false);
  const [editedName, setEditedName] = useState(task.name);

  const { changeTaskStatus, editTask, moveTaskUp, moveTaskDown, deleteTask } =
    useContext(Context);

  let classes = "li";

  if (task.status) {
    classes += " checked";
  }

  const checkedHandler = () => {
    changeTaskStatus(task.id);
  };

  const moveUpHandler = () => {
    moveTaskUp(task.id);
  };

  const moveDownHandler = () => {
    moveTaskDown(task.id);
  };

  const editHandler = () => {
    setEditMode(true);
  };

  const submitHandler = () => {
    setEditMode(false);
    editTask(task.id, editedName);
  };

  const deleteHandler = () => {
    deleteTask(task.id);
  };

  const nameBlock = editMode ? (
    <span>
      <input
        className="editInput"
        type="text"
        size="70"
        maxLength="100"
        autoFocus
        onChange={(event) => setEditedName(event.target.value)}
        onKeyPress={(event) => {
          if (event.key === "Enter") {
            setEditMode(false);
            submitHandler();
          }
        }}
        value={editMode ? editedName : task.name}
      />
    </span>
  ) : (
    <span className="cursor-pointer">{task.name}</span>
  );
  return (
    <li className={classes}>
      <label>
        <span>
          <input
            className="cursor-pointer"
            type="checkbox"
            checked={task.status}
            onChange={checkedHandler}
          />
        </span>
        {nameBlock}
      </label>
      <span className="li-buttons">
        <button
          className="edit-btn"
          onClick={editMode ? submitHandler : editHandler}
        >
          {editMode ? "submit" : "edit"}
        </button>
        &nbsp;
        <button className="edit-btn" onClick={moveUpHandler}>
          ▲
        </button>
        <button className="edit-btn" onClick={moveDownHandler}>
          ▼
        </button>
        &nbsp;
        <button className="remove-btn" onClick={deleteHandler}>
          ✘
        </button>
      </span>
    </li>
  );
}

export default Task;
