import React from "react";
import { AppLoading } from "expo";
import { Container, Text } from "native-base";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import AppNavigator from "./navigator/AppNavigator";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import todoReducer from "./store/todoReducer";
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isReady: false,
    };
  }

  rootReducer = combineReducers({
    todos: todoReducer,
  });
  store = createStore(this.rootReducer);

  async componentDidMount() {
    await Font.loadAsync({
      Roboto: require("native-base/Fonts/Roboto.ttf"),
      Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      ...Ionicons.font,
    });
    this.setState({ isReady: true });
  }

  render() {
    if (!this.state.isReady) {
      return <AppLoading />;
    }

    return (
      <Provider store={this.store}>
        <AppNavigator />
      </Provider>
    );
  }
}
