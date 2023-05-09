import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { useStateContext } from "./hooks/Store";
import Color from "./constants/Color";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Foundation from "@expo/vector-icons/Foundation";
import IonIcons from "@expo/vector-icons/Ionicons";
import useDaerah from "./hooks/useDaerah";

const DetailBengkel = ({ navigation }) => {
  const { id } = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { state } = useStateContext();

  const getDetailBengkel = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://192.168.43.175:8000/api/v1/bengkel/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state?.userInfo?._j.token,
          },
        }
      );
      const result = await response.json();
      console.log("Bengkel =", result.data);
      setData(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDetailBengkel();
  }, []);

  const provinsi = useDaerah(data?.provinsi_id, "provinsi");
  const kota = useDaerah(data?.kota_id, "kota");

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        size="large"
        color={Color.primary}
      />
    );
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerTitle: "Detail",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#fff",
          gestureEnabled: false,
          headerShown: false,
          headerLeft: () => <></>,
        }}
      />
      <View style={styles.container}>
        <View style={styles.boxImage}>
          {data?.foto_bengkel ? (
            <Image style={styles.image} source={{ uri: data?.foto_bengkel }} />
          ) : (
            <Image
              style={styles.image}
              source={require("../assets/img/bengkel.jpg")}
            />
          )}
        </View>
        <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {data?.nama_bengkel}
          </Text>
          <Text>
            {kota.name}, {provinsi.name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              marginTop: 10,
              marginBottom: 5,
              fontWeight: "bold",
            }}
          >
            Kontak :
          </Text>

          <View style={styles.itemWrapp}>
            <Foundation
              size={26}
              style={styles.icon}
              name="telephone"
              color={Color.primary}
            />
            <Text style={styles.itemText}> {data?.no_hp}</Text>
          </View>
          <View style={styles.itemWrapp}>
            <MaterialCommunityIcons
              size={26}
              style={styles.icon}
              name="email"
              color={Color.primary}
            />
            <Text style={styles.itemText}> {data?.email} </Text>
          </View>
          <Text
            style={{
              fontSize: 16,
              marginTop: 10,
              marginBottom: 5,
              fontWeight: "bold",
            }}
          >
            Alamat :
          </Text>

          <View style={styles.itemWrapp}>
            <Foundation
              size={26}
              style={styles.icon}
              name="clock"
              color={Color.primary}
            />
            <Text style={styles.itemText}>
              {" "}
              {data?.jam_buka} - {data?.jam_tutup}
            </Text>
          </View>
          <View style={styles.itemWrapp}>
            <IonIcons
              size={26}
              style={styles.icon}
              name="location"
              color={Color.primary}
            />
            <Text style={styles.itemText}>
              {" "}
              {data?.alamat_lengkap}, {kota.name}, {provinsi.name}
            </Text>
          </View>
        </View>
      </View>
    </>
  );
};

export default DetailBengkel;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
    // margin: 10,
    // paddingHorizontal: 10,
    fontSize: 16,
  },
  boxImage: {
    // width: 50,
    // height: 50,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: 300,
    // borderRadius: 10,
  },
  itemWrapp: {
    // justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
    paddingVertical: 10,
    gap: 8,
    // shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    // },
  },
  itemText: {
    fontSize: 16,
  },
  icon: {
    marginRight: 10,
  },
});
