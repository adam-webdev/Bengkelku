import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useRouter, Link } from "expo-router";
import { useStateContext, getUserInfo } from "./../hooks/Store";
import Color from "../constants/Color";
import { AsyncStorage } from "@react-native-async-storage/async-storage";
import useDaerah from "./../hooks/useDaerah";
const Card = ({ item }) => {
  const router = useRouter();
  const provinsi = useDaerah(item.provinsi_id, "provinsi");
  const kota = useDaerah(item.kota_id, "kota");
  const kecamatan = useDaerah(item.kecamatan_id, "kecamatan");
  const desa = useDaerah(item.desa_id, "desa");
  return (
    // <Link href={{ pathname: "/bengkel/[id]", params: { id: 1 } }}>
    <TouchableOpacity onPress={() => router.push("/DetailBengkel/?id=5")}>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 100, height: 100 }}
          source={require("../../assets/banner/banner.png")}
        />
        <View style={{ gap: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            {item.nama_bengkel}
          </Text>
          <Text style={{ fontSize: 12 }}>
            {kota?.name}, {provinsi?.name}
          </Text>
          <Text style={{ color: "grey", fontSize: 12 }}>Jarak 100 meter</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { state } = useStateContext();

  const getDataBengkel = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        "http://192.168.43.175:8000/api/v1/bengkel/",
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
    getDataBengkel();
  }, []);
  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        size="large"
        color={Color.primary}
      />
    );
  }
  // const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <ScrollView>
      <View style={styles.banner}>
        <Text style={styles.judul}>
          Selamat Datang{" "}
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Adam</Text>
        </Text>
        <Image
          style={styles.imageBanner}
          resizeMode="cover"
          source={require("../../assets/banner/banner.png")}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Cari sekarang</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 10, gap: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold" }}>
          Rekomendasi untuk anda :
        </Text>
        {data?.map((item, index) => {
          return <Card key={index} item={item} />;
        })}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  banner: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  judul: {
    fontSize: 16,
  },
  imageBanner: {
    width: 400,
    objectFit: "contain",
    height: 200,
  },
  button: {
    justifyContent: "center",
    alignItem: "center",
    paddingVertical: 10,
    paddingHorizontal: 34,
    backgroundColor: "#0000a7",
    color: "#fff",
    marginHorizontal: 20,
    borderRadius: 50,
  },
});
