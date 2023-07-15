import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
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
  const router = useRouter();
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
      const result = await response.json();
      console.log("profil =", result.data);
      setData(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDetailProfil();
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
          {data?.foto ? (
            <Image style={styles.image} source={{ uri: data?.foto }} />
          ) : (
            <Image
              style={styles.image}
              source={require("../assets/img/bengkel.jpg")}
            />
          )}
          <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
            {/* {data?.nama_bengkel}  */}
            {data?.name}
          </Text>
          {/* <Text>
            {kota?.name}, {provinsi?.name}
          </Text> */}
          <Text>
            {data?.tipe_user === "Admin Bengkel" ? "(User Bengkel)" : "(User)"}
          </Text>
          {/* {data?.tipe_user === null ? (
            <>
              <TouchableOpacity
                onPress={() => router.push("/CreateBengkel")}
                style={{
                  backgroundColor: Color.secondaryColor,
                  paddingHorizontal: 12,
                  paddingVertical: 5,
                  borderRadius: 4,
                  marginTop: 6,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Buat Bengkel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => router.push("/CreateBengkel")}
                style={{
                  backgroundColor: Color.secondaryColor,
                  paddingHorizontal: 12,
                  paddingVertical: 5,
                  borderRadius: 4,
                  marginTop: 6,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "bold" }}>
                  Buat Bengkel
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            ""
          )} */}
          {/* <TouchableOpacity>
            <Text>Bengkel Saya</Text>
          </TouchableOpacity> */}
        </View>
        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
          {/* <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {data?.nama_bengkel}
          </Text> */}

          <Text
            style={{
              fontSize: 16,
              marginBottom: 5,
              fontWeight: "bold",
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
              Alamat :
            </Text>
          </View>
          <View style={styles.itemWrapp}>
            <Text style={[styles.itemText, { width: "25%" }]}>Desa </Text>
            <Text style={styles.itemText}>: {desa?.name ?? "-"}</Text>
          </View>
          <View style={styles.itemWrapp}>
            <Text style={[styles.itemText, { width: "25%" }]}>Kecamatan </Text>
            <Text style={styles.itemText}>: {kecamatan?.name ?? "-"}</Text>
          </View>
          <View style={styles.itemWrapp}>
            <Text style={[styles.itemText, { width: "25%" }]}>Kota </Text>
            <Text style={styles.itemText}>: {kota?.name ?? "-"}</Text>
          </View>
          <View style={styles.itemWrapp}>
            <Text style={[styles.itemText, { width: "25%" }]}>Provinsi </Text>
            <Text style={styles.itemText}>: {provinsi?.name ?? "-"}</Text>
          </View>

          {/* <View style={styles.itemWrapp}>
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
          </View> */}
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
              color: Color.primary,
              fontSize: 18,
            }}
          >
            Edit Profile
          </Text>
          <Octicons
            name="chevron-right"
            style={{ color: Color.primary, fontSize: 20 }}
          />
        </TouchableOpacity>
      </View>
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
    height: 330,
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
    backgroundColor: "#fff",
    // backgroundColor: "#0000a7",
    cursor: "pointer",
    // color: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 14,
    marginHorizontal: 10,
    // borderRadius: 8,
  },
});
