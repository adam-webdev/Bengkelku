import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
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

const DetailBengkel = ({ navigation }) => {
  const { id } = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
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

  const handleOrder = async () => {
    setLoding(true);
    try {
      const resOrder = await fetch();
    } catch (err) {
      console.log(err);
    }
  };

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
            <TouchableOpacity
              style={styles.linkPesan}
              onPress={() => handleOrder()}
            >
              {/* <Chatbot color={"#fff"} size={30} name="headset" /> */}
              <Text style={styles.textChatbot}>Pesan</Text>
            </TouchableOpacity>

            <View style={styles.buttonChat}>
              <TouchableOpacity
                style={styles.linkChatbot}
                onPress={() => router.push("/ChatBot")}
              >
                <Chatbot color={"#fff"} size={30} name="headset" />
                <Text style={styles.textChatbot}>ChatBot</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.linkChatbot, { backgroundColor: "green" }]}
                onPress={() => sendWhatsApp(data?.no_hp)}
              >
                <Whatsapp color={"#fff"} size={30} name="whatsapp" />
                <Text style={styles.textChatbot}>Hubungi</Text>
              </TouchableOpacity>
            </View>
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
    width: "48%",
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
