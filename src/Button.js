import React from "react";
import "./Button.css";

import { useDispatch } from "react-redux";
import { todoAction } from "./store/todo-slice";

export default function Button(props) {
  const dispatch = useDispatch();
  const changeHandler = (e) => {
    if (e.target.value === "completed") {
      dispatch(todoAction.filterTasks("completed"));
    } else if (e.target.value === "incomplete") {
      dispatch(todoAction.filterTasks("incomplete"));
    } else {
      dispatch(todoAction.filterTasks("all"));
    }
  };
  const addTaskHandler = () => {
    props.onChangeFlag();
  };

  return (
    <div className="button-main">
      <button className="add-task-btn" onClick={addTaskHandler}>
        Add Task
      </button>
      <select className="select-btn" onChange={changeHandler}>
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
}
