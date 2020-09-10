import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  HeaderButtons,
  Item as ItemBtn,
} from "react-navigation-header-buttons";
import { Ionicons } from "@expo/vector-icons";
import HeaderButton from "../Components/HeaderButton";

const About = () => {
  return (
    <View style={{ padding: 12 }}>
      <Text style={{ textAlign: "center", fontSize: 19, paddingBottom: 15 }}>
        App Version: 1.0.0
      </Text>
      <Text style={{ textAlign: "center", fontSize: 17, paddingBottom: 15 }}>
        Developed By <Text style={{ fontWeight: "bold" }}>Okoye Udoka</Text>
      </Text>
      <Text style={{ textAlign: "center", fontSize: 14, paddingBottom: 15 }}>
        {/* <Ionicons name={"md-copyright"} size={25} /> */}
        Copyrights 2020 All Rights Reserved
      </Text>
      <Text style={{ textAlign: "center", fontWeight: "bold" }}>
        Anonymous Messenger
      </Text>
    </View>
  );
};

About.navigationOptions = (navData) => {
  return {
    headerTitle: "About",
    headerLeft: (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <ItemBtn
          title="menu"
          iconName="md-menu"
          onPress={() => {
            navData.navigation.toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};
export default About;

const styles = StyleSheet.create({});
