import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useStateContext, storeData } from "../hooks/Store";

import Octicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";
import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Color from "../constants/Color";
const ProfileScreen = () => {
  const router = useRouter();
  const { state, dispatch } = useStateContext();
  // console.log("test", state.userInfo);

  const handleLogout = () => {
    showAlert();
  };

  const showAlert = () =>
    Alert.alert(
      "Logout",
      "Anda yakin ingin keluar ?",
      [
        {
          text: "Cancel",
          onPress: () => Alert.alert("Cancel"),
          style: "cancel",
        },
        {
          text: "Iya",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("userInfo");
              dispatch({ type: "LOGOUT", payload: "" });
              router.replace("/Login");
            } catch (error) {
              console.log("logout error", error);
            }
          },
        },
      ]
      // {
      //   text: "iya",
      //   onDismiss: () =>
      //     Alert.alert(
      //       "This alert was dismissed by tapping outside of the alert dialog."
      //     ),
      // }
    );
  console.log("profile screen", state);
  return (
    <>
      <View style={styles.container}>
        <View style={styles.box}>
          {state?.userInfo?.user?.foto ? (
            <Image
              style={styles.images}
              source={{ uri: state?.userInfo?.user?.foto }}
            />
          ) : (
            <Image
              style={styles.images}
              source={require("../../assets/img/adam2.png")}
            />
          )}

          <Text style={styles.name}>{state?.userInfo?.user?.name}</Text>
          <Text style={{ fontSize: 18 }}>{state?.userInfo?.user?.email}</Text>
          <Text style={{ fontSize: 15 }}>Bekasi</Text>
        </View>
      </View>
      {state?.userInfo?.user?.roles[0]?.name === "Admin Bengkel" ? (
        <View style={styles.wrappLink}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/Bengkelku")}
          >
            <Text style={{ textAlign: "center", color: "#000", fontSize: 18 }}>
              Bengkelku
            </Text>
            <Octicons
              name="chevron-right"
              style={{ color: "#000", fontSize: 20 }}
            />
          </TouchableOpacity>
        </View>
      ) : (
        ""
      )}

      <View style={styles.wrappLink}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            router.push("/DetailProfil/?id=" + state?.userInfo?.user?.id)
          }
        >
          <Text style={{ textAlign: "center", color: "#000", fontSize: 18 }}>
            Detail Profile
          </Text>
          <Octicons
            name="chevron-right"
            style={{ color: "#000", fontSize: 20 }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.wrappLink}>
        <TouchableOpacity style={styles.button}>
          <Text style={{ textAlign: "center", color: "#000", fontSize: 18 }}>
            Riwayat Transaksi
          </Text>
          <Octicons
            name="chevron-right"
            style={{ color: "green", fontSize: 20 }}
          />
        </TouchableOpacity>
      </View>
      {/* style={{ margin: 10 }} */}
      <View style={styles.wrappLink}>
        <TouchableOpacity style={styles.button} onPress={() => handleLogout()}>
          <Text style={{ textAlign: "center", color: "red", fontSize: 18 }}>
            Keluar
          </Text>
          <Octicons
            name="chevron-right"
            style={{ color: "#000", fontSize: 20 }}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    fontSize: 18,
  },
  wrappLink: {
    marginBottom: 5,
  },

  images: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "#000",
    objectFit: "contain",
    borderRadius: 100,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#fff",
    // backgroundColor: "#0000a7",
    cursor: "pointer",
    // color: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 16,
    // borderRadius: 8,
  },
});
