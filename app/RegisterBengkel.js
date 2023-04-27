import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Pressable,
} from "react-native";
import { useState } from "react";
// import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Link, useRouter, Stack } from "expo-router";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import useTogglePasswordVisibility from "./hooks/useTogglePasswordVisibility";
const RegisterBengkel = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const [isSelected, setSelection] = useState(false);
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
      {/* <MaterialCommunityIcons style={styles.icon} name="garage" size={150} /> */}

      <View style={styles.viewTitle}>
        <Text style={styles.font1}>Silahkan Daftar </Text>
        <Text style={styles.font2}>Sebagai User Bengkel </Text>
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
        <View style={styles.inputContainer}>
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

export default RegisterBengkel;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0000a7",
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
});
