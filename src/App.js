import { useState, useEffect } from "react";
import "./App.css";
import NewTask from "./NewTask";
import TaskList from "./TaskList";
import Context from "./context";

function App() {
  const [arrTask, setArrTask] = useState([]);

  const addTask = (newName) => {
    let maxId;
    arrTask.length === 0
      ? (maxId = 0)
      : (maxId = Number(Math.max(...arrTask.map((item) => item.id))));
    setArrTask([
      ...arrTask,
      {
        name: newName,
        status: false,
        id: maxId + 1,
      },
    ]);
  };

  useEffect(() => {
    const raw = localStorage.getItem("todos");
    setArrTask(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(arrTask));
  }, [arrTask]);

  const changeTaskStatus = (id) => {
    setArrTask(
      arrTask.map((item) => {
        if (item.id === id) {
          return { ...item, status: !item.status };
        } else return item;
      })
    );
  };

  const editTask = (id, newName) => {
    setArrTask(
      arrTask.map((item) => {
        if (item.id === id) {
          return { ...item, name: newName };
        } else return item;
      })
    );
  };

  const moveTaskUp = (id) => {
    const currentItem = arrTask.findIndex((item) => item.id === id);
    const prev = arrTask.slice(0, currentItem - 1);
    const current = arrTask.slice(currentItem - 1, currentItem + 1);
    const next = arrTask.slice(currentItem + 1);
    const currentReverse = [current[1], current[0]];
    const newArr = [...prev, ...currentReverse, ...next];
    if (currentItem === 0) return;
    setArrTask(newArr);
  };

  const moveTaskDown = (id) => {
    const currentItem = arrTask.findIndex((item) => item.id === id);
    const prev = arrTask.slice(0, currentItem);
    const current = arrTask.slice(currentItem, currentItem + 2);
    const next = arrTask.slice(currentItem + 2);
    const currentReverse = [current[1], current[0]];
    const newArr = [...prev, ...currentReverse, ...next];
    if (currentItem === arrTask.length - 1) return;
    setArrTask(newArr);
  };

  const deleteTask = (id) => {
    setArrTask(arrTask.filter((item) => item.id !== id));
  };

  const removeCheckedHandler = () => {
    setArrTask(arrTask.filter((item) => item.status === false));
  };

  const removeAllHandler = () => {
    setArrTask([]);
  };

  const calcProgress =
    arrTask.length === 0
      ? 0
      : arrTask.reduce((sum, item) => {
          if (item.status === true) {
            return (sum += 1);
          } else return sum;
        }, 0);

  const calcWidth =
    arrTask.length === 0
      ? 0 + "%"
      : ((calcProgress * 100) / arrTask.length).toFixed(3) + "%";

  const styleProgressBar = {
    inProgress: {
      background: "cornflowerblue",
      height: "20px",
      width: calcWidth,
    },
  };

  return (
    <Context.Provider
      value={{
        changeTaskStatus,
        editTask,
        moveTaskUp,
        moveTaskDown,
        deleteTask,
      }}
    >
      <div className="App">
        <h1>TODOLIST</h1>
        <NewTask addTask={addTask} />

        {arrTask.length ? <TaskList todos={arrTask} /> : <p>NO TASKS</p>}

        <span className="navigation-footer">
          <span className="progress">
            <div className="progress-container">
              <div style={styleProgressBar.inProgress}></div>
            </div>
            <span className="done-text">
              {calcProgress} of {arrTask.length} done
            </span>
          </span>
          <span>
            <button className="footer-btn" onClick={removeCheckedHandler}>
              remove checked
            </button>
            &nbsp;
            <button className="footer-btn" onClick={removeAllHandler}>
              remove all
            </button>
          </span>
        </span>
      </div>
    </Context.Provider>
  );
}

export default App;
