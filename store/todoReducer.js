import { AsyncStorage } from "react-native";
import { ADD_TODO } from "./todoActions";
import Todo from "../model/todo";
const initialState = {
  todos: [],
};
const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      const newTodo = new Todo(action.id, action.todoTitle);
      return {
        ...state,
        todos: state.todos.concat(newTodo),
      };
    default:
      return state;
  }
};

export default todoReducer;
