import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter, Link } from "expo-router";
import { useStateContext, baseUrl } from "./../hooks/Store";
const haversine = require("haversine");
import Color from "../constants/Color";

import useDaerah from "./../hooks/useDaerah";

const CardBengkel = ({ item, explore }) => {
  const { state, dispatch } = useStateContext();

  const router = useRouter();
  const provinsi = useDaerah(item.provinsi_id, "provinsi");
  const kota = useDaerah(item.kota_id, "kota");
  const kecamatan = useDaerah(item.kecamatan_id, "kecamatan");
  const desa = useDaerah(item.desa_id, "desa");

  const start = {
    latitude: state?.userLocation?.latitude,
    longitude: state?.userLocation?.longitude,
  };
  const end = {
    latitude: item?.latitude,
    longitude: item?.longitude,
  };
  console.log("explore", explore);
  if (explore === "true") {
    return (
      // <Link href={{ pathname: "/bengkel/[id]", params: { id: 1 } }}>

      <TouchableOpacity
        onPress={() => router.push("/DetailBengkel/?id=" + item?.id)}
      >
        <View
          style={[
            styles.elevation,
            {
              backgroundColor: "#fff",
              padding: 10,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              borderRadius: 10,
              // borderWidth: 1,
              // borderColor: "grey",
            },
          ]}
        >
          {item?.foto_bengkel ? (
            <Image
              style={styles.imageBanner}
              resizeMode="cover"
              source={{ uri: item?.foto_bengkel }}
            />
          ) : (
            <Image
              style={styles.imageBanner}
              resizeMode="cover"
              source={require("../../assets/banner/banner.png")}
            />
          )}
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.nama_bengkel}
            </Text>
            <Text style={{ fontSize: 12 }}>
              {kota?.name},{provinsi?.name}
            </Text>
            <Text style={{ fontSize: 12 }}>
              Jarak {Math.round(haversine(start, end, { unit: "km" }))} km
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  if (haversine(start, end, { unit: "km" }) <= 20 && explore !== "true") {
    return (
      // <Link href={{ pathname: "/bengkel/[id]", params: { id: 1 } }}>

      <TouchableOpacity
        onPress={() => router.push("/DetailBengkel/?id=" + item?.id)}
      >
        <View
          style={[
            styles.elevation,
            {
              backgroundColor: "#fff",
              padding: 10,
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              borderRadius: 10,
              // borderWidth: 1,
              // borderColor: "grey",
            },
          ]}
        >
          {item?.foto_bengkel ? (
            <Image
              style={styles.imageBanner}
              resizeMode="cover"
              source={{ uri: item?.foto_bengkel }}
            />
          ) : (
            <Image
              style={styles.imageBanner}
              resizeMode="cover"
              source={require("../../assets/banner/banner.png")}
            />
          )}
          <View style={{ gap: 8 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              {item.nama_bengkel}
            </Text>
            <Text style={{ fontSize: 12 }}>
              {kota?.name},{provinsi?.name}
            </Text>
            <Text style={{ fontSize: 12 }}>
              Jarak {Math.round(haversine(start, end, { unit: "km" }))} km
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

export default CardBengkel;

const styles = StyleSheet.create({
  imageBanner: {
    width: 80,
    objectFit: "cover",
    height: 80,
    borderRadius: 10,
  },
  elevation: {
    elevation: 10,
    shadowColor: Color.primary,
  },
});
