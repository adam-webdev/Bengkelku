import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import Color from "./constants/Color";
import { Link, useRouter, Stack } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import ArrowLeft from "@expo/vector-icons/AntDesign";

const Login = () => {
  const router = useRouter();
  return (
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
      <View>
        <TextInput
          style={styles.input}
          placeholderTextColor="#fff"
          placeholder="Masukan email..."
        />
        <TextInput
          style={styles.input}
          placeholderTextColor="#fff"
          placeholder="Masukan password..."
          secureTextEntry={true}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/home/HomeScreen");
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
          Login
        </Text>
      </TouchableOpacity>
      <Text style={styles.linkRegister}>Belum punya akun ? </Text>
      <Text style={styles.linkRegister}>Daftar sebagai : </Text>
      <View style={styles.linkdaftar}>
        <Text
          onPress={() => {
            router.push("/RegisterBengkel");
          }}
          style={styles.linkDaftar}
        >
          User Bengkel
        </Text>
        <Text style={styles.linkRegister}> Atau </Text>
        <Text
          onPress={() => {
            router.push("/Register");
          }}
          style={styles.linkDaftar}
        >
          User Biasa
        </Text>
      </View>
      {/* Use the `Link` compoSnent to enable optimized client-side routing. */}
    </View>
  );
};

export default Login;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0000a7",
  },
  font: {
    fontSize: 26,
    color: "#F05D0E",
    fontWeight: "bold",
    marginBottom: 10,
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
    margin: 14,
    fontSize: 18,
    borderColor: "#fff",
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
});
