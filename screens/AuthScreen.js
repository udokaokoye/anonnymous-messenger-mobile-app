import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Button,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
  Alert,
} from "react-native";
import {
  Container,
  Icon,
  Title,
  Content,
  Form,
  Item,
  Input,
  Label,
  Text,
} from "native-base";
import NetInfo from "@react-native-community/netinfo";
const AuthScreen = (props) => {
  const [authMethod, setauthMethod] = useState("Signup");
  const [isloading, setisloading] = useState(false);
  const [fullname, setfullname] = useState("");
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [Error, setError] = useState("");

  useEffect(() => {
    const verify = async () => {
      setisloading(true);
      const user_id = await AsyncStorage.getItem("user_messaging_id_token");
      if (user_id) {
        const user = JSON.parse(user_id);
        props.navigation.navigate("MainScreen");
      }
      setisloading(false);
    };
    verify();
  }, []);

  const signup = async () => {
    setisloading(true);
    await NetInfo.fetch().then((state) => {
      if (state.isConnected === false) {
        Alert.alert(
          "Connection Error",
          "Please check your internet connection and try again",
          [
            {
              text: "Try Again",
              onPress: () => {
                signup();
              },
            },
          ],
          { cancelable: false }
        );
        return;
      }
    });
    if (fullname.trim().length === 0) {
      setError("Please enter fullname.");
      setisloading(false);
      return;
    } else if (username.trim().length === 0) {
      setError("");
      setError("Please enter username.");
      setisloading(false);
      return;
    } else if (password.trim().length < 6) {
      setError("");
      setError("Please make sure password length is greater than six.");
      setisloading(false);
      return;
    }
    fetch(
      "https://annonymousmessenger.000webhostapp.com/Mobile%20App/signup.php",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          fullname: fullname,
          username: username.trim(),
          password: password,
        }),
      }
    )
      .then((response) => response.json())
      .then((serverresponse) => {
        setisloading(false);
        if (serverresponse[0] === "Success") {
          const redirect = async () => {
            setisloading(true);
            await AsyncStorage.setItem(
              "user_messaging_id_token",
              JSON.stringify({
                id: serverresponse[1],
              })
            );
            setisloading(false);
            props.navigation.navigate("MainScreen", {
              userId: "serverresponse[1]",
            });
          };
          redirect();
        } else {
          setError(serverresponse[1]);
        }
      });
  };
  const login = async () => {
    setisloading(true);
    await NetInfo.fetch().then((state) => {
      if (state.isConnected === false) {
        Alert.alert(
          "Connection Error",
          "Please check your internet connection and try again",
          [
            {
              text: "Try Again",
              onPress: () => {
                login();
              },
            },
          ],
          { cancelable: false }
        );
        return;
      }
    });
    if (username.trim().length === 0) {
      setError("");
      setError("Please enter username.");
      setisloading(false);
      return;
    } else if (password.trim().length < 6) {
      setError("");
      setError("Please make sure password length is greater than six.");
      setisloading(false);
      return;
    }
    fetch(
      "https://annonymousmessenger.000webhostapp.com/Mobile%20App/login.php",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }
    )
      .then((response) => response.json())
      .then((serverresponse) => {
        setisloading(false);
        if (serverresponse[0] === "Success") {
          const redirect = async () => {
            setisloading(true);
            await AsyncStorage.setItem(
              "user_messaging_id_token",
              JSON.stringify({
                id: serverresponse[1],
              })
            );
            setisloading(false);
            props.navigation.navigate("MainScreen", {
              userId: "serverresponse[1]",
            });
          };
          redirect();
        } else {
          setError(serverresponse[1]);
        }
      });
  };
  if (isloading) {
    return (
      <View
        style={{ flex: 1, justifyContent: "center", alignContent: "center" }}
      >
        <ActivityIndicator size="large" color="#0D5396" />
      </View>
    );
  }
  return (
    <KeyboardAvoidingView
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Form style={{ width: "80%" }}>
        <Text style={styles.leadText}>Anonymous Messenger</Text>
        <Text style={styles.authMethod}>{authMethod}</Text>
        <Text style={{ color: "red", fontWeight: "bold" }}>{Error}</Text>
        {authMethod === "Signup" ? (
          <Item style={{ width: "100%" }} floatingLabel>
            <Label style={{ width: "100%" }}>Fullname</Label>
            <Input
              value={fullname}
              onChangeText={(val) => setfullname(val)}
              style={{ width: "100%" }}
            />
          </Item>
        ) : null}
        <Item style={{ width: "100%" }} floatingLabel>
          <Label style={{ width: "100%" }}>Username</Label>
          <Input
            value={username}
            onChangeText={(val) => setusername(val)}
            style={{ width: "100%" }}
          />
        </Item>
        <Item style={{ width: "100%", marginBottom: 25 }} floatingLabel last>
          <Label style={{ width: "100%" }}>Password</Label>
          <Input
            secureTextEntry
            value={password}
            onChangeText={(val) => setpassword(val)}
            style={{ width: "100%" }}
            autoCapitalize="none"
          />
        </Item>
        <Button
          color="#0D5396"
          title={authMethod}
          onPress={authMethod === "Signup" ? signup : login}
        />
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: 5,
          }}
        >
          <Text>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              authMethod === "Signup"
                ? setauthMethod("Login")
                : setauthMethod("Signup");
            }}
          >
            <Text style={{ color: "#0D5396" }}>
              {authMethod === "Signup" ? "login" : "signup"}
            </Text>
          </TouchableOpacity>
        </View>
      </Form>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Authentication",
  };
};

export default AuthScreen;

const styles = StyleSheet.create({
  leadText: {
    fontWeight: "bold",
    color: "#0D5396",
    fontSize: 21,
    textAlign: "center",
  },
  authMethod: {
    fontSize: 19,
    padding: 5,
    textAlign: "center",
  },
});
