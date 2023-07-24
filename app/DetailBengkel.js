import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";

import * as Linking from "expo-linking";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter, Stack } from "expo-router";
// import { Stack } from "expo-router";
import { useStateContext, baseUrl } from "./hooks/Store";
import Color from "./constants/Color";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Foundation from "@expo/vector-icons/Foundation";
import IonIcons from "@expo/vector-icons/Ionicons";
import useDaerah from "./hooks/useDaerah";
import useToken from "./hooks/useToken";
import Chatbot from "@expo/vector-icons/FontAwesome5";
import Whatsapp from "@expo/vector-icons/FontAwesome";
import { showAlert } from "./components/Alert";

const DetailBengkel = ({ navigation }) => {
  const { id } = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);
  const [error, setError] = useState(false);
  const { state } = useStateContext();
  const router = useRouter();
  const getDetailBengkel = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/bengkel/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.userInfo?.token,
        },
      });
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
  // console.log(state.userLocation);
  const dataOrder = {
    user_id: state.userInfo.user.id,
    bengkel_id: id,
    admin_bengkel: data?.user_id,
    lng: state.userLocation.longitude,
    lat: state.userLocation.latitude,
  };
  const showAlert = () =>
    Alert.alert("Berhasil", "Pesanan anda telah terkirim", [
      // {
      //   text: "OK",
      //   onPress: () => Alert.alert("ok"),
      //   style: "OK",
      // },
      {
        text: "tutup",
        onPress: async () => {
          try {
            router.push("/home/HomeScreen");
          } catch (error) {
            console.log("logout error", error);
          }
        },
      },
    ]);

  const handleOrder = async () => {
    // const user_id = state.userInfo.user.id;
    // const bengkel_id = id;
    setLoadingOrder(true);

    try {
      const responseOrder = await fetch(`${baseUrl}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.userInfo?.token,
        },
        body: JSON.stringify(dataOrder),
      });
      console.log("data order :", dataOrder);
      console.log("selesai");
      const resultOrder = await responseOrder.json();
      console.log(resultOrder);
      setLoadingOrder(false);
      return showAlert();

      // router.push("/home/HomeScreen");
    } catch (err) {
      console.log("err", err);
    }
  };

  console.log("lodaing order ", loadingOrder);
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
  const sendWhatsApp = (phone) => {
    let msg = "type something";
    let phoneWithCountryCode = phone;

    let mobile =
      Platform.OS == "ios" ? phoneWithCountryCode : "+" + phoneWithCountryCode;
    if (mobile) {
      if (msg) {
        let url = "whatsapp://send?text=" + msg + "&phone=" + mobile;
        Linking.openURL(url)
          .then((data) => {
            console.log("WhatsApp Opened");
          })
          .catch(() => {
            alert("Make sure WhatsApp installed on your device");
          });
      } else {
        alert("Please insert message to send");
      }
    } else {
      alert("Please insert mobile no");
    }
  };
  return (
    <>
      <Stack
        name="DetailBengkel"
        screenOptions={{
          // headerTitle: "Detail",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerTintColor: "#fff",
          gestureEnabled: false,
          headerShown: false,
          headerLeft: () => <></>,
        }}
        options={{
          title: "Detail Bengkel",
        }}
      />
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.boxImage}>
            {data?.foto_bengkel ? (
              <Image
                style={styles.image}
                source={{ uri: data?.foto_bengkel }}
              />
            ) : (
              <Image
                style={styles.image}
                source={require("../assets/img/bengkel.jpg")}
              />
            )}
          </View>
          <View
            style={[
              styles.cardBox,
              { paddingVertical: 20, paddingHorizontal: 10 },
            ]}
          >
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>
              {data?.nama_bengkel}
            </Text>
            <Text style={{ fontSize: 16 }}>{data?.deskripsi ?? "-"}</Text>
            {/* <Text>
              {kota.name}, {provinsi.name}
            </Text> */}
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
                {kota.name}, {provinsi.name}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.linkPesan}
              onPress={() => handleOrder()}
              disabled={loadingOrder}
            >
              {loadingOrder ? (
                <ActivityIndicator
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  size="large"
                  color={Color.primary}
                />
              ) : (
                <>
                  <IonIcons size={26} name="call" color="#fff" />
                  <Text style={styles.textChatbot}>Pesan</Text>
                </>
              )}
            </TouchableOpacity>

            {/* <TouchableOpacity
                style={styles.linkChatbot}
                onPress={() => router.push("/ChatBot")}
              >
                <Chatbot color={"#fff"} size={30} name="headset" />
                <Text style={styles.textChatbot}>ChatBot</Text>
              </TouchableOpacity> */}
            <TouchableOpacity
              style={[styles.linkChatbot, { backgroundColor: "green" }]}
              onPress={() => sendWhatsApp(data?.no_hp)}
            >
              <Whatsapp color={"#fff"} size={30} name="whatsapp" />
              <Text style={styles.textChatbot}>Hubungi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default DetailBengkel;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "#fff",
    // margin: 10,
    // paddingHorizontal: 10,
    flex: 1,
    fontSize: 16,
  },
  boxImage: {
    // width: 50,
    // height: 50,
    flex: 1,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  cardBox: {
    // position: "absolute",
    // margin: 10,
    // bottom: -300,
    // top: 100,
    // justifyContent: "flex-end",
    borderRadius: 4,
    backgroundColor: "#fff",
    // gap: 8,
    // shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
    borderRadius: 4,
    backgroundColor: "#fff",
    // gap: 8,
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
  linkChatbot: {
    backgroundColor: Color.secondaryColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderRadius: 6,
    marginTop: 10,
    padding: 8,
  },
  linkPesan: {
    backgroundColor: Color.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    borderRadius: 6,
    marginTop: 10,
    padding: 8,
  },
  buttonChat: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textChatbot: {
    fontSize: 18,
    color: "#fff",
  },
});
