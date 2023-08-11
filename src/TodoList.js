import React from "react";
import "./TodoList.css";
import { AiFillEdit, AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { todoAction } from "./store/todo-slice";

export default function TodoList(props) {
  const dispatch = useDispatch();
  const { id, title, datetime, status } = props.todos;
  const deletehandler = () => {
    dispatch(todoAction.deleteTask(id));
  };
  const edithandler = () => {
    const data = { id, title, status };
    props.onUChangeFlag(data);
  };
  const statusHandler = () => {
    dispatch(todoAction.statusChange(id));
  };
  return (
    <>
      {(props.filterStatus === "all" || status === props.filterStatus) && (
        <section className="todo-main">
          <input
            type="checkbox"
            onChange={statusHandler}
            checked={status === "completed" ? "checked" : ""}
          />
          <div className="todo-content">
            <h4
              className={`${
                status === "incomplete"
                  ? "todo-content-title"
                  : "todo-content-title-completed"
              }`}
            >
              {title}
            </h4>
            <p className="todo-content-time">{datetime}</p>
          </div>
          <div className="todo-btns">
            <AiOutlineDelete className="icons-btn" onClick={deletehandler} />
            <AiFillEdit className="icons-btn" onClick={edithandler} />
          </div>
        </section>
      )}
    </>
  );
}
