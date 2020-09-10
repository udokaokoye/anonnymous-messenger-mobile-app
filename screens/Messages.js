import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  FlatList,
  ActivityIndicator,
  Button,
  Alert,
} from "react-native";
import {
  HeaderButtons,
  Item as ItemBtn,
} from "react-navigation-header-buttons";
import { Container, Icon, Content } from "native-base";
import HeaderButton from "../Components/HeaderButton";

const Messages = (props) => {
  const [user_idd, setuser_idd] = useState("");
  const [messageData, setmessageData] = useState([]);
  const [isRefreshing, setisRefreshing] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [heightCon, setheightCon] = useState(180);
  const getUserId = async () => {
    setisLoading(true);
    const idd = await AsyncStorage.getItem("user_messaging_id_token");
    const user_id = JSON.parse(idd).id;
    setuser_idd(user_id);
    getMessages(user_id);
  };
  const getMessages = async (id) => {
    try {
      setisRefreshing(true);
      await fetch(
        "https://annonymousmessenger.000webhostapp.com/Mobile%20App/getMessage.php",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            id: id,
          }),
        }
      )
        .then((response) => response.json())
        .then((serverresponse) => {
          setmessageData(serverresponse);
          setisRefreshing(false);
          // !Console.log the data
          // console.log(serverresponse);
          setisLoading(false);
        });
    } catch (error) {
      Alert.alert(
        "Connection Error",
        "Please check your internet connection and try again",
        [
          {
            text: "Try Again",
            onPress: () => {
              getUserId();
            },
          },
        ],
        { cancelable: false }
      );
    }
  };
  useEffect(() => {
    getUserId();
  }, []);

  const onLayout = (e) => {
    // const { height } = e.nativeEvent.textLayout;
    // const count = Math.floor(height / styles.message.lineHeight);
    if (e.nativeEvent.lines.length > 3) {
      setheightCon("auto");
    }
  };

  const renderUserMessages = (itemData) => {
    return (
      <View
        style={{ height: heightCon, ...styles.messageContainer }}
        key={itemData.item.Message}
      >
        <Text style={styles.leadText}>Message:</Text>
        <Text style={styles.message} onTextLayout={onLayout}>
          {itemData.item.Message}
        </Text>
        <Text>-Anonymous- {itemData.item.Time}</Text>
      </View>
    );
  };
  if (messageData.length === 0) {
    return (
      <View style={styles.noMessageContainer}>
        <Text style={styles.noMessageLead1}>No Messages yet.</Text>
        <Text style={styles.noMessageLead2}>
          Share your link or refresh messages
        </Text>
        <View style={styles.btnContainer}>
          <View style={styles.btn}>
            <Button
              title="Share"
              onPress={() => {
                props.navigation.navigate("Home");
              }}
            />
          </View>
          <View style={styles.btn}>
            <Button
              title="Refresh"
              onPress={getMessages.bind(this, user_idd)}
            />
          </View>
        </View>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0D5396" />
      </View>
    );
  }
  return (
    <Container>
      <FlatList
        onRefresh={getMessages.bind(this, user_idd)}
        refreshing={isRefreshing}
        data={messageData}
        renderItem={renderUserMessages}
      />
    </Container>
  );
};

Messages.navigationOptions = (navData) => {
  return {
    headerTitle: "Messages",
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

export default Messages;

const styles = StyleSheet.create({
  messageContainer: {
    // height: 180,
    width: "93%",
    alignSelf: "center",
    margin: 10,
    borderRadius: 12,
    borderWidth: 1.9,
    borderColor: "#0D5396",
    overflow: "scroll",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: 12,
  },
  leadText: {
    padding: 9,
    color: "#0D5396",
    fontSize: 17,
  },
  message: {
    fontSize: 15,
    padding: 9,
    fontWeight: "bold",
  },
  btnContainer: {
    flexDirection: "row",
    width: "60%",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
  },
  btn: {
    borderRadius: 8,
    overflow: "hidden",
  },
  noMessageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  noMessageLead1: {
    fontSize: 20,
    padding: 5,
  },
  noMessageLead2: {
    fontSize: 14,
    padding: 5,
    paddingBottom: 7,
  },
});
