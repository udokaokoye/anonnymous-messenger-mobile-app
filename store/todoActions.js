import { AsyncStorage } from "react-native";
export const ADD_TODO = "ADD_TODO";
export const DELETE_TODO = "DELETE_TODO";

export const addTodo = (title) => {
  return { type: ADD_TODO, todoTitle: title, id: new Date().toString() };

  saveDataToStorage(action.id, action.todoTitle);
  getTodosFromStorage();
};

export const deleteTodo = (id) => {
  return { type: DELETE_TODO };
};

const getTodosFromStorage = async () => {
  const Todos = await AsyncStorage.getItem("Todos");
  console.log(Todos);
};

const saveDataToStorage = (id, todo) => {
  AsyncStorage.setItem(
    "Todos",
    JSON.stringify({
      id: id,
      todo: todo,
    })
  );
};
