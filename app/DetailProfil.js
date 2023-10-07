import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import Octicons from "@expo/vector-icons/Octicons";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "expo-router";
import { Stack } from "expo-router";
import { useStateContext, baseUrl } from "./hooks/Store";
import Color from "./constants/Color";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Foundation from "@expo/vector-icons/Foundation";
import IonIcons from "@expo/vector-icons/Ionicons";
import useDaerah from "./hooks/useDaerah";
import useToken from "./hooks/useToken";

const DetailProfil = ({ navigation }) => {
  const { id } = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { state } = useStateContext();
  const [locationUser, setLocationUser] = useState();
  const router = useRouter();
  console.log("Id", id);

  const getDetailProfil = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.userInfo?.token,
        },
      });
      console.log("cek", response);
      const result = await response.json();
      console.log("finish");
      console.log("profil =", result.data);
      setData(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const reverseGeocodeUser = async () => {
    try {
      console.log("Mulai");
      const LocUser = await Location.reverseGeocodeAsync({
        latitude: state?.userLocation.latitude,
        longitude: state?.userLocation.longitude,
      });
      setLocationUser(LocUser[0]);
      console.log("end");
      console.log("LocationUser : ", LocUser);
    } catch (err) {
      console.log("error is : ", err);
    }
  };
  useEffect(() => {
    getDetailProfil();
  }, []);
  useEffect(() => {
    reverseGeocodeUser();
  }, []);
  const provinsi = useDaerah(data?.provinsi_id, "provinsi");
  const kota = useDaerah(data?.kota_id, "kota");
  const kecamatan = useDaerah(data?.kecamatan_id, "kecamatan");
  const desa = useDaerah(data?.desa_id, "desa");

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        size="large"
        color={Color.primary}
      />
    );
  }
  // const users = {
  //   name: data.name,
  //   no_hp: data.no_hp,
  //   email: data.email,
  //   jenis_kelamin: data.jenis_kelamin,
  //   foto: data.foto,
  // };
  console.log("location ", locationUser?.city);
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
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.boxImage}>
            {data?.foto ? (
              <Image style={styles.image} source={{ uri: data?.foto }} />
            ) : (
              <Image
                style={styles.image}
                source={require("../assets/img/bengkel.jpg")}
              />
            )}
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
              {data?.name}
            </Text>

            <Text>
              {data?.tipe_user === "Admin Bengkel"
                ? "(User Bengkel)"
                : "(User)"}
            </Text>
          </View>
          <View style={{ backgroundColor: "#fff" }}>
            <Text
              style={{
                fontSize: 16,
                marginBottom: 5,
                fontWeight: "bold",
                padding: 10,
              }}
            >
              Detail :
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
            <View style={[styles.itemWrapp, { alignItems: "center" }]}>
              <IonIcons
                size={26}
                style={styles.icon}
                name="location"
                color={Color.primary}
              />
              <Text style={[styles.itemText, { fontWeight: "bold" }]}>
                Lokasi saat ini :
              </Text>
            </View>
            {/* city": "Kecamatan Sidoarjo", "country": "Indonesia", "district":
          "Sidokumpul", "isoCountryCode": "ID", "name": "8E", "postalCode":
          "61213", "region": "Jawa Timur", "street": "Jalan Diponegoro",
          "streetNumber": "8E", "subregion": "Kabupaten Sidoarjo", "timezone":
          null} */}
            <View style={styles.itemWrapp}>
              <Text style={[styles.itemText, { width: "25%" }]}>Desa </Text>
              <Text style={styles.itemText}>: {locationUser?.district}</Text>
            </View>
            <View style={styles.itemWrapp}>
              <Text style={[styles.itemText, { width: "25%" }]}>
                Kecamatan{" "}
              </Text>
              <Text style={styles.itemText}>: {locationUser?.city}</Text>
            </View>
            <View style={styles.itemWrapp}>
              <Text style={[styles.itemText, { width: "25%" }]}>Kota </Text>
              <Text style={styles.itemText}>: {locationUser?.subregion}</Text>
            </View>
            <View style={styles.itemWrapp}>
              <Text style={[styles.itemText, { width: "25%" }]}>Provinsi </Text>
              <Text style={styles.itemText}>: {locationUser?.region}</Text>
            </View>
            <View style={styles.itemWrapp}></View>
          </View>
          <TouchableOpacity
            style={styles.button}
            onPress={() =>
              router.push({
                pathname: "/EditProfile",
                params: { id: data?.id },
              })
            }
          >
            <Text
              style={{
                textAlign: "center",
                color: "#fff",
                fontSize: 18,
              }}
            >
              Edit Profile
            </Text>
            <Octicons
              name="chevron-right"
              style={{ color: "#fff", fontSize: 20 }}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

export default DetailProfil;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
    // margin: 10,
    // paddingHorizontal: 10,
    fontSize: 16,
  },
  boxImage: {
    // width: 50,
    height: 300,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    objectFit: "cover",
    width: 200,
    height: 200,
    borderRadius: 200,
    // borderRadius: 10,
  },
  itemWrapp: {
    // justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
    paddingVertical: 6,
    borderBottom: "#ebebeb",
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
  button: {
    backgroundColor: Color.primary,
    // backgroundColor: "#0000a7",
    cursor: "pointer",
    color: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 16,
    // borderRadius: 8,
  },
});
