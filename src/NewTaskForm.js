import React, { useState } from "react";
import "./NewTaskForm.css";
import "./Button.css";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { todoAction } from "./store/todo-slice";

export default function NewTaskForm(props) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("incomplete");
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const selectionhandler = (e) => {
    setStatus(e.target.value);
    console.log(status);
  };
  const addTaskhandler = (e) => {
    e.preventDefault();
    let id = new Date().toString() + title;
    //Empty title error
    const data = {
      id: id,
      title: title,
      datetime: new Date().toString(),
      status: status,
      edit: false,
    };
    dispatch(todoAction.addTask(data));
    props.onChangeFlag();
    //Add task tootip
  };
  const cancelTaskHandler = () => {
    props.onChangeFlag();
  };
  return (
    <>
      <div className="main-form">
        <div className="main-form-button">
          <IoClose onClick={cancelTaskHandler} className="close-icon-btn" />
        </div>
        <div className="form-header">
          <form className="form-details" onSubmit={addTaskhandler}>
            <p>Add TODO</p>
            <label>Title</label>
            <input type="text" onChange={titleHandler}/>
            <label>Status</label>
            <select id="statusVal" onChange={selectionhandler}>
              <option value="incomplete">Incomplete</option>
              <option value="completed">Completed</option>
            </select>
            <div className="buttons-club">
              <button type="submit" className="add-task-btn">
                Add Task
              </button>
              <button
                type="button"
                className="select-btn"
                onClick={cancelTaskHandler}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
