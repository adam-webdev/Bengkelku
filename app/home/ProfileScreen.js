import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import Octicons from "@expo/vector-icons/Octicons";

import React from "react";

const ProfileScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.box}>
          <Image
            style={styles.images}
            source={require("../../assets/img/adam2.png")}
          />
          <Text style={styles.name}>Adam dwi maulana</Text>
          <Text>adamdwi@gmail.com</Text>
          <Text>Bekasi</Text>
        </View>
      </View>
      <View style={{ margin: 10 }}>
        <TouchableOpacity style={styles.button}>
          <Text style={{ textAlign: "center", color: "#000", fontSize: 18 }}>
            Edit Profile
          </Text>
          <Octicons
            name="chevron-right"
            style={{ color: "#000", fontSize: 20 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ margin: 10 }}>
        <TouchableOpacity style={styles.button}>
          <Text style={{ textAlign: "center", color: "#000", fontSize: 18 }}>
            Riwayat Transaksi
          </Text>
          <Octicons
            name="chevron-right"
            style={{ color: "#000", fontSize: 20 }}
          />
        </TouchableOpacity>
      </View>
      <View style={{ margin: 10 }}>
        <TouchableOpacity style={styles.button}>
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
    margin: 10,
  },
  box: {
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
    fontSize: 18,
  },
  images: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "#0000a7",
    objectFit: "contain",
    borderRadius: 100,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#fff",
    // backgroundColor: "#0000a7",
    color: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 8,
  },
});
