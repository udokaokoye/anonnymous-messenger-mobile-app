import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  AsyncStorage,
  ActivityIndicator,
  TouchableOpacity,
  Clipboard,
  Share,
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
import {
  HeaderButtons,
  Item as ItemBtn,
} from "react-navigation-header-buttons";
import { Ionicons, SimpleLineIcons } from "@expo/vector-icons";
import HeaderButton from "../Components/HeaderButton";
const MainScreen = (props) => {
  const [user_id, setuser_id] = useState("");
  const [userData, setuserData] = useState({});
  const [isloading, setisloading] = useState(false);
  useEffect(() => {
    const getId = async () => {
      const id = await AsyncStorage.getItem("user_messaging_id_token");
      const usid = JSON.parse(id);
      getUserData(usid.id);
    };
    const getUserData = async (id) => {
      try {
        setisloading(true);
        // const id = await AsyncStorage.getItem("user_messaging_id_token");
        // const userid = JSON.parse(id);
        await fetch(
          "https://annonymousmessenger.000webhostapp.com/Mobile%20App/getUser.php",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
            },
            body: JSON.stringify({
              userId: id,
            }),
          }
        )
          .then((response) => response.json())
          .then((data) => {
            setuserData(data);
            // console.log(data);
            setisloading(false);
          });
      } catch (error) {
        Alert.alert(
          "Connection Error",
          "Please check your internet connection and try again",
          [
            {
              text: "Try Again",
              onPress: () => {
                getId();
              },
            },
          ],
          { cancelable: false }
        );
      }
    };

    getId();
  }, []);

  if (isloading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#0D5396" />
      </View>
    );
  }
  const copyToClipboard = () => {
    Clipboard.setString(
      `https://annonymousmessenger.000webhostapp.com/write.php?user=${userData.Username}`
    );
    alert("Link Copied");
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Write a secret anonymous message for me 😎😎😎 i won't know who wrote it 😉😘😘❤➡️➡️ https://annonymousmessenger.000webhostapp.com/write.php?user=${userData.Username}     Powered By ➡️➡️ *Udokovic Soft*😎 `,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <Container>
      <Content>
        <View style={styles.headerContainer}>
          <Text style={styles.welcomeText}>
            Welcome,{" "}
            <Text
              style={{ fontWeight: "bold", color: "#0D5396", fontSize: 20 }}
            >
              {userData.Full_Name}
            </Text>
          </Text>
        </View>
        <Text style={styles.description}>
          Share your profile link to friends to get response from your friends.
          Go to "View Messages" to check out the responses.
        </Text>
        <View style={styles.mainAppContainer}>
          <TouchableOpacity
            style={styles.viewMessage}
            onPress={() => {
              props.navigation.navigate("Messages");
            }}
          >
            <Ionicons
              name="ios-chatboxes"
              size={24}
              color="white"
              style={{ marginRight: 11 }}
            />
            <Text style={styles.btnText}>View Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={copyToClipboard} style={styles.clickCopy}>
            <Ionicons
              name="ios-copy"
              size={24}
              color="white"
              style={{ marginRight: 11 }}
            />
            <Text style={styles.btnText}>Click To Copy</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare} style={styles.shareWhatsapp}>
            <Ionicons
              name="logo-whatsapp"
              size={24}
              color="white"
              style={{ marginRight: 11 }}
            />
            <Text style={styles.btnText}>Share To Whatsapp</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare} style={styles.shareFacebook}>
            <Ionicons
              name="logo-facebook"
              size={24}
              color="white"
              style={{ marginRight: 11 }}
            />
            <Text style={styles.btnText}>Share To Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.logout}
            onPress={async () => {
              await AsyncStorage.removeItem("user_messaging_id_token");
              props.navigation.navigate("AuthNav");
            }}
          >
            <SimpleLineIcons
              name="logout"
              size={22}
              color="white"
              style={{ marginRight: 11 }}
            />
            <Text style={styles.btnText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Content>
    </Container>
  );
};

MainScreen.navigationOptions = (navData) => {
  return {
    headerTitle: "Anonymous Messenger",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <ItemBtn
          title="Cart"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default MainScreen;

const styles = StyleSheet.create({
  welcomeText: {
    fontSize: 20,
  },
  headerContainer: {
    borderLeftColor: "#0D5396",
    borderLeftWidth: 9,
    marginTop: 15,
    padding: 5,
  },
  description: {
    fontSize: 15,
    padding: 19,
  },
  mainAppContainer: {
    alignItems: "center",
  },
  btnText: {
    color: "white",
    fontSize: 19,
  },
  viewMessage: {
    width: "80%",
    height: 60,
    backgroundColor: "#0d5496f5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    margin: 10,
    flexDirection: "row",
  },
  clickCopy: {
    width: "80%",
    height: 60,
    backgroundColor: "#0d5496f5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    margin: 10,
    flexDirection: "row",
  },
  shareWhatsapp: {
    width: "80%",
    height: 60,
    backgroundColor: "#029950f5",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    margin: 10,
    flexDirection: "row",
  },
  shareFacebook: {
    width: "80%",
    height: 60,
    backgroundColor: "#0184ffde",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    margin: 10,
    flexDirection: "row",
  },
  logout: {
    width: "80%",
    height: 60,
    backgroundColor: "#ff1201de",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    margin: 10,
    flexDirection: "row",
  },
});
