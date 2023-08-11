import React, { useState } from "react";
import "./NewTaskForm.css";
import "./Button.css";
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { todoAction } from "./store/todo-slice";

export default function UpdateForm(props) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(props.data.title);
  const [status, setStatus] = useState(props.data.status);
  const titleHandler = (e) => {
    setTitle(e.target.value);
  };
  const selectionhandler = (e) => {
    setStatus(e.target.value);
  };
  const editTaskhandler = (e) => {
    e.preventDefault();
    //Empty title error
    const data = {
      id: props.data.id,
      title: title,
      datetime: new Date().toString(),
      status: status,
      edit: false,
    };
    dispatch(todoAction.editTask(data));
    props.onUChangeFlag();
    //Add task tootip
  };
  const cancelTaskHandler = () => {
    props.onUChangeFlag();
  };
  return (
    <>
      <div className="main-form">
        <div className="main-form-button">
          <IoClose onClick={cancelTaskHandler} className="close-icon-btn" />
        </div>
        <div className="form-header">
          <form className="form-details" onSubmit={editTaskhandler}>
            <p>Add TODO</p>
            <label>Title</label>
            <input
              type="text"
              onChange={titleHandler}
              value={props.data.title}
            />
            <label>Status</label>
            <select id="statusVal" value={status} onChange={selectionhandler}>
              <option value="incomplete">Incomplete</option>
              <option value="completed">Completed</option>
            </select>
            <div className="buttons-club">
              <button type="submit" className="add-task-btn">
                Update Task
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
