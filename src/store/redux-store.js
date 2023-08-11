import {configureStore} from '@reduxjs/toolkit';
import todoListReducer from './todo-slice';

const store=configureStore({
    reducer:{ todoList:todoListReducer}
})
export default store;