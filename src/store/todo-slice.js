import { createSlice } from "@reduxjs/toolkit";

const initialTodoState = {
  todoList: [
    {
      id: "1",
      title: "Pending Tickets",
      datetime: "Tue Jun 27 2023 17:14:21 GMT+0530 (India Standard Time)",
      status: 'incomplete',
      edit: false,
    },
    {
      id: "2",
      title: "Complete sprint",
      datetime: "Tue Jun 27 2023 17:16:21 GMT+0530 (India Standard Time)",
      status: "completed",
      edit: false,
    },
  ],
  filterStatus:'all'
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("todos", serializedState);
  } catch (error) {
    // Handle storage errors if necessary
    console.error("Error saving state:", error);
  }
};

const loadState = () => {
  try {
    const serializedState = localStorage.getItem("todos");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (error) {
    // Handle storage errors if necessary
    console.error("Error loading state:", error);
    return undefined;
  }
};

const persistedState = loadState();
//saveState(initialTodoState);
const todoSlice = createSlice({
  name: "todoList",
  initialState: persistedState || initialTodoState,
  reducers: {
    saveStateChange(state){
      saveState(state);
    },
    addTask(state, action) {
      state.todoList.push(action.payload);
      saveState(state);
    },
    filterTasks(state, action) {
      state.filterStatus = action.payload;
    },    
    deleteTask(state, action) {
      state.todoList = state.todoList.filter(
        (data) => data.id !== action.payload
      );
      saveState(state);
    },
    editTask(state, action) {
      state.todoList = state.todoList.filter(
        (data) => data.id !== action.payload.id
      );
      state.todoList.push(action.payload);
      saveState(state);
    },
    statusChange(state, action) {
      const item = state.todoList.find((data) => data.id === action.payload);
      if (item) {
        item.status = item.status==='completed'?'incomplete':'completed';
        saveState(state);
      }
    },
    saveStateHandler(state){
      saveState(state);
    }
  },
});

export const todoAction = todoSlice.actions;
export default todoSlice.reducer;
