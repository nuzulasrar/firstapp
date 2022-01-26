import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Button,
  Pressable,
  Alert,
  TextInput,
  AppRegistry,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Location from "expo-location";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";

const Stack = createNativeStackNavigator();

const RegistrationScreen2 = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          component={RegistrationScreen}
          name="RegistrationScreen"
          options={{ headerShown: false }}
        />
        <Stack.Screen component={ProfileFunction} name="Profile" />
        <Stack.Screen component={AttendanceFunction} name="Attendance" />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const RegistrationScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    const authenticate = async () => {
      //alert(username);
      axios
        .post(
          "https://smarthelpersystem.ucyp.edu.my/mobileapp/public/api/login",
          {
            username: username,
            password: password,
          }
        )
        .then(function (response) {
          if (response.data.result == 200) {
            // alert(
            //   response.data.result + " " + response.data.user.idinfostaf
            // );
            navigation.navigate("Profile", {
              nama: response.data.infostaf.nama,
              id: response.data.infostaf.idinfostaf,
              email: response.data.infostaf.email,
              nokp: response.data.infostaf.nokp,
              stafid: response.data.infostaf.stafid,
              gambar: response.data.infostaf.gambar,
              idjawatan: response.data.infojawatan.idjawatan,
              jawatan: response.data.jawatan.jawatan,
              jabatan: response.data.jabatan.jabatan,
            });
            setIsSubmit(false);
          } else {
            alert("Username or Password is incorrect");
            setIsSubmit(false);
          }
        })
        .catch(function (error) {
          console.log(error);
        });
      // axios
      //   .post(
      //     "https://smarthelpersystem.ucyp.edu.my/mobileapp/public/api/login",
      //     //[{username, password,}]
      //     JSON.stringify({
      //       username: username,
      //       password: password,
      //     })
      //   )
      //   .then((response) => {
      //     setIsSubmit(false);
      //     //navigate users based on the response
      //     // if (response.data.result == "logged in") {
      //     //   navigation.navigate("Atttendance", {
      //     //     nama: response.data.nama,
      //     //     id: response.data.idinfostaf,
      //     //   });
      //     //   //alert(response.data.nama);
      //     // } else {
      //     //   // console.log(response.data);
      //     //   alert(response.data.result);
      //     // }
      //     alert(response.data.staffinfo);

      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    };
    if (isSubmit) authenticate();
  }, [isSubmit]);

  const usernameHandler = (text) => {
    //validations
    setUsername(text);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.colorr}>UCYP</Text> */}
      <Image
        style={styles.logo}
        source={{
          uri: "https://www.ucyp.edu.my/wp-content/uploads/2018/06/xlogo-UCYP-02-3.png.pagespeed.ic_.xhDmre2uYj.png",
        }}
      />
      <TextInput
        placeholder="Username"
        autoCapitalize="none"
        style={styles.inputStyle}
        onChangeText={usernameHandler}
      />
      <TextInput
        placeholder="Password"
        autoCapitalize="none"
        style={styles.inputStyle}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
      />
      {/* <Pressable style={styles.buttonStyle} onPress={() => setIsSubmit(true) }>
                <Text style={styles.colorr}>Log In</Text>
            </Pressable> */}
      <View style={{ margin: 10, width: "35%", fontSize: 50 }}>
        <Button
          color="#FB695A"
          style={styles.buttonStyle}
          title="Log In"
          onPress={() => setIsSubmit(true)}
        />
      </View>
    </View>
  );
};

const ProfileFunction = ({ route, navigation }) => {
  const {
    nama,
    nokp,
    email,
    idinfostaf,
    stafid,
    gambar,
    idjawatan,
    jawatan,
    jabatan,
  } = route.params;

  const [thead, setThead] = useState(["Type", "Details"]);
  const [tbody, setTbody] = useState([
    ["Name", nama],
    // ["Gambar", gambar],
    ["IC", nokp],
    ["Staff ID", stafid],
    ["Position", jawatan],
    ["Department", jabatan],
    ["Email", email],
  ]);

  const profilepic =
    "https://staff.ucyp.edu.my/STAFF_UCYP/e_resource/gambar_staf/" + gambar;

  const [isAttendance, setIsAttendance] = useState(false);

  useEffect(() => {
    const authattendance = async () => {
      setIsAttendance(false);
      // alert(route.params.id);
      navigation.navigate("Attendance", { id: route.params.id });
    };
    if (isAttendance) authattendance();
  }, [isAttendance]);

  return (
    <SafeAreaView style={styles.container2}>
      <ScrollView>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Image
            style={styles.profilepic}
            source={{
              uri: profilepic,
            }}
          />
        </View>
        <Table
          borderStyle={{
            padding: 10,
            borderWidth: 2,
            borderColor: "#fff",
            borderRadius: 10,
          }}
        >
          <Row data={thead} style={styles.thead} textStyle={styles.ttext} />
          <Rows data={tbody} textStyle={styles.ttext} />
        </Table>
          <View style={{height: 25}}></View>
        <View>
          <TouchableOpacity
            style={styles.btncss}
            onPress={() => setIsAttendance(true)}
          >
            <Text>E-Finger</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const AttendanceFunction = ({ route, navigation }) => {
  const { id } = route.params;

  const [dt, setDt] = useState(new Date().toLocaleString());

  useEffect(() => {
    let secTimer = setInterval(() => {
      setDt(new Date().toLocaleString());
    }, 1000);

    return () => clearInterval(secTimer);
  }, []);

  //Hook
  const [checkclockin, setCheckclockin] = useState(true);
  const [butangTitle, setButangTitle] = useState("...checking");
  const [disableButton, setDisableButton] = useState(false);

  useEffect(() => {
    const authenticate3 = async () => {
      axios
        .post(
          "https://staff.ucyp.edu.my/STAFF_UCYP/login/staffattendancecheck_reactnative.php",
          JSON.stringify({
            id: route.params.id,
          })
        )
        .then((response) => {
          setCheckclockin(false);
          //navigate users based on the response
          console.log(
            "statuscode: " +
              response.data.statusCode +
              "\nidinfostaf: " +
              response.data.idinfostaf +
              "\ntimeclockin: " +
              response.data.timeclockin +
              "\nclockin: " +
              response.data.clockin +
              "\nclockout: " +
              response.data.clockout +
              "\nHour: " +
              response.data.time
          );
          if (response.data.statusCode == 1) {
            //alert(response.data.idinfostaf);

            if (response.data.time < 17) {
              setButangTitle("CLOCK OUT: \nONLY AFTER 5.00PM");
              setDisableButton(true);
            }
            if (response.data.time >= 17) {
              setButangTitle("CLOCK OUT");
              setDisableButton(false);
            }
          } else if (response.data.statusCode == 2) {
            setButangTitle("YOU HAVE CLOCKED IN AND OUT TODAY.");
            setDisableButton(true);
          } else if (response.data.statusCode == 3) {
            setButangTitle("CLOCK IN");
            setDisableButton(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (checkclockin) authenticate3();
  }, [checkclockin]);

  const [isClockedin, setIsisClockedin] = useState(false);

  useEffect(() => {
    const authenticate2 = async () => {
      setDisableButton(true);
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        alert(
          "Permission not granted. Allow the app to use location service.",
          // [{ text: "OK" }],
          // { cancelable: false }
        );
      }

      let { coords } = await Location.getCurrentPositionAsync();

      if (coords) {
        const { latitude, longitude } = coords;
        let response = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });

        for (let item of response) {
          var address = `${item.name}, ${item.street}, ${item.postalCode}, ${item.city}`;
        }
      }

      axios
        .post(
          "https://staff.ucyp.edu.my/STAFF_UCYP/login/staffattendance_reactnative.php",
          JSON.stringify({
            id: route.params.id,
            address: address,
          })
        )
        .then((response) => {
          setIsisClockedin(false);
          checkClockList(true);
          //navigate users based on the response
          if (response.data.statusCode == 1) {
            alert("You have succesfully CLOCKED OUT");
            setCheckclockin(true);
          } else if (response.data.statusCode == 2) {
            alert(
              "You have succesfully CLOCKED IN. Please CLOCK OUT after 5.00 PM"
            );
            setCheckclockin(true);
          } else {
            alert("API error. Please Contact IT Admin");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (isClockedin) authenticate2();
  }, [isClockedin]);

  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setCount((count) => count + 1);
      if (count == 5) {
        setCount(0);
        setCheckclockin(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  //retrieve clock in data for

  const [thead, setThead] = useState(["Type", "Details"]);
  const [tbody, setTbody] = useState([
    ["Clock In", ""],
    ["Clock Out", ""],
  ]);

  const [isList, checkClockList] = useState(true);

  useEffect(() => {
    const attendancelist = async () => {
      checkClockList(false);
      axios
        .post(
          "https://smarthelpersystem.ucyp.edu.my/mobileapp/public/api/clockinlist",
          {
            id: route.params.id,
          }
        )
        .then((response) => {
          checkClockList(false);
          //navigate users based on the response
          if (response.data.result == 200) {
            // alert(
            //   response.data.result +
            //     " " +
            //     response.data.id +
            //     " " +
            //     response.data.clockin +
            //     " " +
            //     response.data.clockout
            // );
            setThead(["Today's Attendance"]);
            setTbody([
              ["Clock In", response.data.clockin],
              ["Clock Out", response.data.clockout],
            ]);
          } else {
            //alert(response.data.result + " " + response.data.id);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
    if (isList) attendancelist();
  }, [isList]);

      


  return (
    <View style={styles.container2}>
      <View style={{height: 30}}></View>
      <Table
        borderStyle={{
          padding: 10,
          borderWidth: 2,
          borderColor: "#fff",
          borderRadius: 10,
        }}
      >
        <Row data={thead} style={styles.thead} textStyle={styles.ttext} />
        <Rows data={tbody} textStyle={styles.ttext} />
      </Table>
      <View style={{height: 30}}></View>
      <Text style={styles.colorr}>{dt}</Text>
      <View style={{height: 30}}></View>
      <View style={{ margin: 10, width: "100%", fontSize: 50 }}>
        <Button
          disabled={disableButton}
          style={styles.buttonStyle}
          title={butangTitle}
          onPress={() => setIsisClockedin(true)}
        />
        {/* <Button title="Show My Location"
        color="red" 
        onPress={GetCurrentLocation}
         /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  tcontainer: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: "#fff" },
  thead: { height: 40, backgroundColor: "#000", color: "#fff" },
  ttext: { margin: 6, color: "#fff" },
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  container2: {
    flex: 1,
    backgroundColor: "#000",
  },
  btncss: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "green",
    height: 50,
    width: "100%",
    flex: 1,
    shadowColor: "white",
    marginBottom: 2,
    marginTop: 2,
  },
  logo: {
    height: 104,
    width: 274,
  },
  profilepic: {
    height: 200,
    width: 150,
    marginBottom: 40,
  },
  textgreen: {
    color: "green",
  },
  inputStyle: {
    width: "80%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "#fff",
    borderBottomColor: "#fff",
    borderTopColor: "#fff",
    borderLeftColor: "#fff",
    borderRightColor: "#fff",
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderRadius: 5,
    marginBottom: 5,
  },
  buttonStyle: {
    height: 40,
    width: "70%",
    backgroundColor: "green",
    borderRadius: 10,
  },
  colorr: {
    color: "white",
    fontSize: 23,
    textAlign: "center",
  },
});

export default RegistrationScreen2;
