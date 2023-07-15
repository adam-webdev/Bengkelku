import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { useStateContext, storeData, baseUrl } from "./../hooks/Store";
import Octicons from "@expo/vector-icons/Octicons";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Color from "../constants/Color";
const TransaksiScreen = () => {
  const { state, dispatch } = useStateContext();
  // console.log("test", state.userInfo);
  // const { id } = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();

  const getOrderByUser = async () => {
    setLoading(true);
    const user_id = state.userInfo.user.id;
    try {
      const response = await fetch(`${baseUrl}/order/${user_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.userInfo?.token,
        },
      });
      console.log("selesai");
      const result = await response.json();
      console.log("result order : ", result?.data);
      setData(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOrderByUser();
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
  return (
    <>
      <View style={styles.title}>
        <Text style={styles.textTitle}>Riwayat Order Anda :</Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          {data?.map((item, index) => (
            <TouchableOpacity style={{ gap: 8 }} key={index}>
              <View style={styles.box}>
                <View style={{ gap: 8 }}>
                  <Text style={styles.name}>ORDERB3N600{item?.id}</Text>
                  <Text style={{ fontSize: 18 }}>
                    {item?.bengkel?.nama_bengkel}
                  </Text>
                  <Text style={{ fontSize: 16 }}>{item?.tanggal}</Text>
                </View>
                <View style={{ gap: 5, alignItems: "center" }}>
                  <Text>Status :</Text>
                  <Text
                    style={[
                      styles.status,
                      {
                        backgroundColor:
                          item?.status === "Diproses"
                            ? "orange"
                            : item?.status === "Ditolak"
                            ? "red"
                            : "green",
                      },
                    ]}
                  >
                    {item?.status}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default TransaksiScreen;

const styles = StyleSheet.create({
  title: {
    padding: 8,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    gap: 8,
  },
  box: {
    gap: 5,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  wrappLink: {
    marginBottom: 5,
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
  // images: {
  //   width: 200,
  //   height: 200,
  //   borderWidth: 2,
  //   borderColor: "#000",
  //   objectFit: "contain",
  //   borderRadius: 100,
  // },
  name: {
    fontSize: 16,
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
