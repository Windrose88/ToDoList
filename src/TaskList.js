import Task from "./Task";
import "./TaskList.css";

function TaskList({ todos }) {
  return (
    <ul>
      {todos.map((item) => (
        <Task key={item.id} task={item} />
      ))}
    </ul>
  );
}

export default TaskList;
