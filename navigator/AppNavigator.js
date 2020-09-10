import React, { useState } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  DrawerItems,
} from "react-navigation";
import MainScreen from "../screens/MainScreen";
import AuthScreen from "../screens/AuthScreen";
import MessageScreen from "../screens/Messages";
import AboutScreen from "../screens/About";
import { Ionicons } from "@expo/vector-icons";
import {
  Platform,
  SafeAreaView,
  View,
  Button,
  AsyncStorage,
} from "react-native";

const Messagenavigator = createStackNavigator(
  {
    Messagescreen: MessageScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0D5396",
      },
      headerTintColor: "white",
    },
  }
);

const AboutNavigator = createStackNavigator(
  {
    Aboutscreen: AboutScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0D5396",
      },
      headerTintColor: "white",
    },
  }
);

const Homenaviagtor = createStackNavigator(
  {
    mainscreen: MainScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0D5396",
      },
      headerTintColor: "white",
    },
  }
);

const Authscreen = createStackNavigator(
  {
    Auth: AuthScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0D5396",
      },
      headerTintColor: "white",
    },
  }
);

const AppNavigator = createDrawerNavigator(
  {
    Home: Homenaviagtor,
    Messages: Messagenavigator,
    About: AboutNavigator,
  },
  {
    contentComponent: (props) => {
      return (
        <View
          style={{
            flex: 1,
            paddingTop: Platform.OS === "android" ? 35 : 0,
          }}
        >
          <SafeAreaView forceInset={{ top: "always", horizontal: "never" }}>
            <DrawerItems {...props} />
            <Button
              title="Logout"
              color={"red"}
              onPress={async () => {
                await AsyncStorage.removeItem("user_messaging_id_token");
                props.navigation.navigate("AuthNav");
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthenticationScreen = createSwitchNavigator({
  AuthNav: Authscreen,
  MainScreen: AppNavigator,
});

// const AuthNavigator = createStackNavigator(
//   {
//     Auth: AuthScreen,
//     Log: AuthenticationScreen,
//   },
//   {
//     defaultNavigationOptions: {
//       headerStyle: {
//         backgroundColor: "#0D5396",
//       },
//       headerTintColor: "white",
//     },
//   }
// );
export default createAppContainer(AuthenticationScreen);
