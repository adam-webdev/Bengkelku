import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useState, Redirect } from "react";
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import Color from "./constants/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Link, useRouter, Stack } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useTogglePasswordVisibility from "./hooks/useTogglePasswordVisibility";
import { useStateContext, storeData } from "./hooks/Store";

const Register = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [nohp, setNohp] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useStateContext();
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState({});
  // const [pwConfirm, setPwConfirm] = useState("");

  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [isSelected, setSelection] = useState(false);

  const handleRegister = async () => {
    setError(false);
    // setPwConfirm("");
    setLoading(true);
    // if (password !== confirmPassword) {
    //   setPwConfirm("Konfirmasi password beda!");
    //   return;
    // }
    try {
      const response = await fetch(
        "http://192.168.43.175:8000/api/v1/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "Application/json",
          },
          body: JSON.stringify({
            name,
            email,
            no_hp: nohp,
            password,
            // confirm_password: confirmPassword,
          }),
        }
      );
      const result = await response.json();
      if (result?.success) {
        console.log("hasil ", result);
        setData(result.data.user);
        await AsyncStorage.setItem("userInfo", JSON.stringify(result.data));
        dispatch({ type: "LOGIN", payload: result?.data });
        setLoading(false);
        router.replace("/home/HomeScreen");
      } else {
        console.log("error result", result.message);
        setError(true);
        setData(result?.message);
        setLoading(false);
      }
    } catch (err) {
      // setError(true);
      setLoading(false);
    }
  };
  // console.log("user info", user);
  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        size="large"
        color={Color.primary}
      />
    );
  }
  // console.log("user", getUserInfo());
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        {/* Use the `Screen` component to configure the layout. */}
        <Stack.Screen
          screenOptions={{
            headerStyle: {
              backgroundColor: "#0000a7",
            },
            headerShown: false,
          }}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#0000a7" },
          }}
        />
        {/* <MaterialCommunityIcons style={styles.icon} name="garage" size={150} /> */}

        <View style={styles.viewTitle}>
          <Text style={styles.font1}>Silahkan Daftar </Text>
          <Text style={styles.font2}>Sebagai User Biasa </Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholderTextColor="#fff"
            placeholder="Masukan username..."
            value={name}
            onChangeText={(text) => setName(text)}
          />
          {error ? (
            data?.name ? (
              <Text style={styles.textError}>{data?.name}</Text>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <TextInput
            style={styles.input}
            placeholderTextColor="#fff"
            placeholder="Masukan email..."
            value={email}
            onChangeText={(text) => setEmail(text)}
          />
          {error ? (
            data?.email ? (
              <Text style={styles.textError}>{data?.email}</Text>
            ) : (
              <Text style={styles.textError}>{data}</Text>
            )
          ) : (
            ""
          )}
          <TextInput
            style={styles.input}
            placeholderTextColor="#fff"
            placeholder="Masukan nomor hp..."
            value={nohp}
            onChangeText={(text) => setNohp(text)}
            keyboardType="numeric"
            minLength={11}
          />
          {error ? (
            data?.no_hp ? (
              <Text style={styles.textError}>{data?.no_hp}</Text>
            ) : (
              ""
            )
          ) : (
            ""
          )}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#fff"
              placeholder="Masukan password..."
              secureTextEntry={passwordVisibility}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="newPassword"
              secureTextEntry={passwordVisibility}
              value={password}
              enablesReturnKeyAutomatically
              onChangeText={(text) => setPassword(text)}
            />
            <Pressable onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons
                style={styles.eyeIcon}
                name={rightIcon}
                size={22}
                color="#fff"
              />
            </Pressable>
          </View>
          {/* {console.log("data test ===>", data)} */}
          {error ? <Text style={styles.textError}>{data?.password}</Text> : ""}

          {/* <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholderTextColor="#fff"
              placeholder="Konfirmasi password..."
              secureTextEntry={passwordVisibility}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="newPassword"
              secureTextEntry={passwordVisibility}
              value={confirmPassword}
              enablesReturnKeyAutomatically
              onChangeText={(text) => setConfirmPassword(text)}
            />
            <Pressable onPress={handlePasswordVisibility}>
              <MaterialCommunityIcons
                style={styles.eyeIcon}
                name={rightIcon}
                size={22}
                color="#fff"
              />
            </Pressable>
          </View>
          {data?.confirmPassword ? (
            <Text style={styles.textError}>{data?.confirmPassword}</Text>
          ) : (
            ""
          )} */}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleRegister();
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              color: "#fff",
              fontSize: 24,
            }}
          >
            Daftar
          </Text>
        </TouchableOpacity>
        <Text style={styles.linkRegister}>
          Sudah punya akun ?{" "}
          <Text
            onPress={() => {
              router.push("/Login");
            }}
            style={styles.linkDaftar}
          >
            Silahkan Login!
          </Text>
        </Text>
        {/* Use the `Link` compoSnent to enable optimized client-side routing. */}
      </View>
    </ScrollView>
  );
};

export default Register;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 100,
    backgroundColor: "#0000a7",
  },
  container: {
    flex: 1,
    alignItems: "center",
    // backgroundColor: "#0000a7",
    paddingTop: 30,
  },
  inputContainer: {
    width: "100%",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  font: {
    fontSize: 26,
    color: "#F05D0E",
    fontWeight: "bold",
    marginBottom: 10,
  },
  viewTitle: {
    alignItems: "center",
    justifyContent: "center",
  },
  font2: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 30,
  },
  checkbox: {
    alignSelf: "center",
  },
  font1: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  font2: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 30,
  },
  button: {
    width: 320,
    backgroundColor: "#F05D0E",
    align: "center",
    padding: 8,
    marginTop: 10,
    borderRadius: 50,
  },
  input: {
    width: 320,
    color: "#fff",
    margin: 14,
    fontSize: 18,
    borderColor: "#fff",
    borderWidth: 1,
    padding: 8,
    borderRadius: 50,
  },
  linkRegister: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
  },
  linkDaftar: {
    color: "#F05D0E",
    fontSize: 16,
    fontWeight: "bold",
  },
  icon: {
    color: "#fff",
    marginTop: 50,
  },
  eyeIcon: {
    position: "absolute",
    marginLeft: -50,
    marginTop: -10,
  },
  textError: {
    fontSize: 16,
    color: Color.secondaryColor,
    marginLeft: 20,
    marginTop: -10,
  },
});
