import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TextInput,
  AppRegistry,
} from "react-native";
import RegistrationScreen from "./RegistrationScreen";
import RegistrationScreen2 from "./RegistrationScreen";

export default function App() {
  return (
    // <View style={styles.container}>
    //   <Text style={styles.colorr}>UCYP</Text>
    //   <Button title="Log In" onPress={Alert.alert("right button pressed")}/>
    //   <StatusBar style="auto" />
    // </View>
    <RegistrationScreen2 />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  colorr: {
    color: "white",
    fontSize: 40,
  },
});
