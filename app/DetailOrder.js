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

const DetailOrder = ({ navigation }) => {
  const { id } = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { state } = useStateContext();
  const router = useRouter();
  const getDetailOrder = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/detail-order/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.userInfo?.token,
        },
      });
      const result = await response.json();
      console.log("detail Order =", result.data);
      setData(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDetailOrder();
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

      <View style={[styles.container, { paddingBottom: 20 }]}>
        <View style={styles.boxImage}>
          {data?.bengkel?.foto_bengkel ? (
            <Image
              style={styles.image}
              source={{ uri: data?.bengkel?.foto_bengkel }}
            />
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
        </View>
        <View style={styles.title}>
          <Text style={styles.textTitle}>
            Detail Order: ORDERB3N600{data?.id}
          </Text>
        </View>
        <View style={styles.itemWrapp}>
          <Text>Pemesan :</Text>
          <Text style={[styles.itemText, { fontWeight: "bold" }]}>
            {state?.userInfo?.user.name}
          </Text>
        </View>
        <View style={styles.itemWrapp}>
          <Text>Nama Bengkel :</Text>
          <Text style={[styles.itemText, { fontWeight: "bold" }]}>
            {data?.bengkel?.nama_bengkel}
          </Text>
        </View>
        <View style={styles.itemWrapp}>
          <Text>Email Bengkel :</Text>
          <Text style={[styles.itemText, { fontWeight: "bold" }]}>
            {data?.bengkel?.email}
          </Text>
        </View>
        <View style={styles.itemWrapp}>
          <Text>Kontak Bengkel :</Text>
          <Text style={[styles.itemText, { fontWeight: "bold" }]}>
            {data?.bengkel?.no_hp}
          </Text>
        </View>
        <View style={styles.itemWrapp}>
          <Text>Tanggal :</Text>
          <Text style={[styles.itemText, { fontWeight: "bold" }]}>
            {data?.tanggal}
          </Text>
        </View>
        <View style={[styles.itemWrapp, { alignItems: "center" }]}>
          <Text>Status :</Text>
          <Text
            style={[
              styles.status,
              {
                backgroundColor:
                  data?.status === "Diproses"
                    ? "orange"
                    : data?.status === "Ditolak"
                    ? "red"
                    : "green",
              },
            ]}
          >
            {data?.status}
          </Text>
        </View>
        <View style={[styles.itemWrapp, { marginBottom: 20 }]}>
          <Text>Keterangan status :</Text>
          <Text style={[styles.itemText, { fontWeight: "bold" }]}>
            {data?.keterangan ?? "-"}
          </Text>
        </View>
      </View>
    </>
  );
};

export default DetailOrder;

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
  },
  boxImage: {
    // width: 50,
    // marginTop: 20,
    height: 300,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: 270,
    // borderRadius: 200,
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

  status: {
    backgroundColor: "green",
    borderRadius: 20,
    textAlign: "center",
    paddingVertical: 10,
    paddingHorizontal: 14,
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    padding: 8,
    backgroundColor: "white",
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
