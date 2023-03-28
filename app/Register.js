import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import React from "react";
import { Link, useRouter, Stack } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Register = () => {
  const router = useRouter();
  return (
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
      <MaterialCommunityIcons style={styles.icon} name="garage" size={150} />

      <View>
        <Text style={styles.font1}>Silahkan Daftar </Text>
      </View>
      <View>
        <TextInput
          style={styles.input}
          placeholderTextColor="#fff"
          placeholder="Masukan username..."
        />
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
          router.push("/Login");
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
  );
};

export default Register;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0000a7",
  },
  font: {
    fontSize: 30,
    color: "#F05D0E",
    fontWeight: "bold",
    marginBottom: 10,
  },
  font1: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 30,
  },
  button: {
    width: 320,
    backgroundColor: "#F05D0E",
    align: "center",
    padding: 10,
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
    padding: 12,
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
});
