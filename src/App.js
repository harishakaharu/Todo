import "./App.css";
import Button from "./Button";
import { useState } from "react";
import TodoList from "./TodoList";
import { useDispatch, useSelector } from "react-redux";
import NewTaskForm from "./NewTaskForm";
import UpdateForm from "./UpdateForm";
import { todoAction } from "./store/todo-slice";

function App() {
  const [addTaskFlag, setAddTaskFlag] = useState(false);
  const [todo, setTodo] = useState("");
  const [updateTaskFlag, setUpdateTaskFlag] = useState(false);
  const todoList = useSelector((state) => state.todoList.todoList);
  const filterStatus = useSelector((state) => state.todoList.filterStatus);
  const dispatch = useDispatch();
  dispatch(todoAction.saveStateChange());
  const onChangeFormFlag = () => {
    setAddTaskFlag((prev) => !prev);
  };
  const onUChangeFormFlag = (data) => {
    setUpdateTaskFlag((prev) => !prev);
    setTodo(data);
  };
  return (
    <>
      {updateTaskFlag && (
        <div className="overlay">
        <UpdateForm data={todo} onUChangeFlag={onUChangeFormFlag} />
        </div>
      )}
      {addTaskFlag && (
        <div className="overlay">
          <NewTaskForm onChangeFlag={onChangeFormFlag} />{" "}
        </div>
      )}
      <div className="App">
        <header className="header-main">TODO LIST</header>
        <main className="main">
          <Button onChangeFlag={onChangeFormFlag} />
        </main>
        <div className="contents">
          {todoList ? (
            todoList.map((data) => (
              <TodoList
                todos={data}
                key={data.id}
                filterStatus={filterStatus}
                onUChangeFlag={onUChangeFormFlag}
              />
            ))
          ) : (
            <h1>No Todos</h1>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
