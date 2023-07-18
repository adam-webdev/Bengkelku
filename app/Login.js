import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useNavigation,
  useRouter,
  useLocalSearchParams,
  Link,
  Stack,
} from "expo-router";

import React, { useState, useEffect } from "react";
import Color from "./constants/Color";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import ArrowLeft from "@expo/vector-icons/AntDesign";
import useTogglePasswordVisibility from "./hooks/useTogglePasswordVisibility";
import { useStateContext, storeData, baseUrl } from "./hooks/Store";

const Login = () => {
  const router = useRouter();
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state, dispatch } = useStateContext();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const params = useLocalSearchParams();
  const focusHandle = () => {
    if (error) {
      setError(false);
    }
  };
  const handleLogin = async () => {
    setLoading(true);
    setError(false);
    console.log("email", email);
    console.log("password", password);
    try {
      const response = await fetch(`${baseUrl}/login`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });
      const result = await response.json();
      if (result.success) {
        console.log("hasil ==> ", result);
        setData(result.data.user);
        await AsyncStorage.setItem("userInfo", JSON.stringify(result.data));
        dispatch({ type: "LOGIN", payload: result.data });
        setLoading(false);
        router.replace("/home/HomeScreen");
      } else {
        console.log("error", result.message);
        setError(true);
        ``;
        setData(result.message);
        setLoading(false);
      }
    } catch (err) {
      setError(true);
      setLoading(false);
    }

    // console.log(state?.userInfo);
    // console.log("data => ", data.message.email);

    // console.log(SecureStore.getItemAsync("userInfo"));
  };
  // console.log("data params", params?.data?.user);
  useEffect(() => {}, []);
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        {/* Use the `Screen` component to configure the layout. */}
        <Stack.Screen
          screenOptions={{
            headerShown: false,
          }}
          options={{
            headerTitle: "",
            headerShadowVisible: false,
            headerStyle: { backgroundColor: "#0000a7" },
          }}
        />
        <MaterialCommunityIcons style={styles.icon} name="garage" size={150} />

        <View>
          <Text style={styles.font1}>Silahkan Login </Text>
        </View>
        <View style={{ color: "red" }}></View>
        <View>
          <TextInput
            onFocus={() => focusHandle()}
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
          <View style={styles.inputContainer}>
            <TextInput
              onFocus={() => focusHandle()}
              style={styles.input}
              placeholderTextColor="#fff"
              placeholder="Masukan password..."
              secureTextEntry={passwordVisibility}
              autoCapitalize="none"
              autoCorrect={false}
              // textContentType="newPassword"
              // secureTextEntry={passwordVisibility}
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
          {error ? <Text style={styles.textError}>{data?.password}</Text> : ""}
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleLogin()}
          disabled={loading}
        >
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              color: "#fff",
              fontSize: 24,
            }}
          >
            Login
          </Text>
        </TouchableOpacity>
        <View style={styles.lupaPassword}>
          <Text>{""}</Text>
          <Text
            onPress={() => {
              router.push("LupaPassword");
            }}
            style={{ color: "#fff", fontSize: 16 }}
          >
            Lupa password ?
          </Text>
        </View>
        <Text style={styles.linkRegister}>Belum punya akun ? </Text>
        <Text
          onPress={() => {
            router.push("/Register");
          }}
          style={styles.linkDaftar}
        >
          Daftar sekarang
        </Text>
        <View style={styles.linkdaftar}>
          {/* <Text
            onPress={() => {
              router.push("/RegisterBengkel");
            }}
            style={styles.linkDaftar}
          >
            User Bengkel
          </Text> */}
          {/* <Text style={styles.linkRegister}> Atau </Text> */}
          {/* <Text
            onPress={() => {
              router.push("/Register");
            }}
            style={styles.linkDaftar}
          >
            User Biasa
          </Text> */}
        </View>

        {/* Use the `Link` compoSnent to enable optimized client-side routing. */}
      </View>
    </ScrollView>
  );
};

export default Login;
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    height: 100,
    backgroundColor: "#0000a7",
  },
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0000a7",
  },
  inputContainer: {
    width: "100%",
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  lupaPassword: {
    flexDirection: "row",
    alignItems: "center",
    color: "#fff",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  font: {
    fontSize: 26,
    color: "#F05D0E",
    fontWeight: "bold",
    marginBottom: 10,
  },
  eyeIcon: {
    position: "absolute",
    marginLeft: -50,
    marginTop: -10,
  },
  font1: {
    fontSize: 26,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    width: 320,
    backgroundColor: Color.secondaryColor,
    align: "center",
    padding: 8,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 50,
  },
  input: {
    width: 320,
    color: "#fff",
    marginBottom: 10,
    marginTop: 10,
    fontSize: 18,
    borderColor: "white",
    borderWidth: 1,
    padding: 12,
    borderRadius: 50,
  },
  linkRegister: {
    fontSize: 16,
    color: "#fff",
  },
  linkDaftar: {
    color: "#F05D0E",
    fontWeight: "bold",
    fontSize: 18,
  },
  linkdaftar: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    color: "#fff",
    marginTop: 80,
  },
  textError: {
    fontSize: 16,
    color: Color.secondaryColor,
    marginLeft: 20,
    marginTop: -10,
  },
});
