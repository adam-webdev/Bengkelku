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
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { useRouter, Link, useSearchParams } from "expo-router";
import {
  useStateContext,
  getUserInfo,
  getUserToken,
  baseUrl,
} from "./hooks/Store";
import Color from "./constants/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

import Loader from "./components/Loader";
import { AirbnbRating } from "@rneui/themed";

const DetailUlasan = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { state, dispatch } = useStateContext();
  const router = useRouter();

  const { bengkel_id } = useSearchParams();

  console.log("token", state?.userInfo?.token);
  const getDataUlasan = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/ulasan/${bengkel_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.userInfo?.token,
        },
      });
      console.log("bengkel ulasan => ", response);
      const result = await response.json();
      console.log("Ulasan =", result.data);
      setData(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDataUlasan();
  }, []);

  if (loading) {
    return <Loader isLoading={loading} />;
  }
  // const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const sliceName = (text) => {
    const count = 6;
    if (text) {
      return text.slice(0, count) + (text.length > count ? "..." : "");
    }
    return null;
  };

  const CardUlasan = ({ item }) => (
    <>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          gap: 10,
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: "grey",
        }}
      >
        {item?.user.foto ? (
          <Image
            style={styles.imageBanner}
            resizeMode="cover"
            source={{ uri: item?.user.foto }}
          />
        ) : (
          <Image
            style={styles.imageBanner}
            resizeMode="cover"
            source={require("../assets/img/default.jpg")}
          />
        )}
        <View style={{ gap: 8 }}>
          <Text>{item?.user?.name} </Text>
          <AirbnbRating
            showRating={false}
            isDisabled={true}
            defaultRating={item?.angka_ulasan}
            size={18}
            fractions={5}
          />
          <Text style={{ fontSize: 12 }}>{item?.ulasan}</Text>
        </View>
      </View>
    </>
  );

  return (
    <ScrollView
      style={{
        backgroundColor: "#fff",
      }}
    >
      <Text style={{ marginLeft: 20, marginTop: 10 }}>Ulasan Bengkel :</Text>

      <View style={styles.container}>
        {/* <StatusBar /> */}
        {data?.map((item, index) => {
          return <CardUlasan item={item} key={index} />;
        })}
      </View>
    </ScrollView>
  );
};

export default DetailUlasan;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    position: "relative",
    gap: 10,
  },
  imageBanner: {
    width: 80,
    objectFit: "cover",
    height: 80,
    borderRadius: 10,
  },
  banner: {
    flexDirection: "row",
    backgroundColor: "#fff",
    // justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    // marginTop: -80,
    width: "90%",
    borderRadius: 20,
    gap: 20,
    top: 8,
    padding: 10,
  },
  judul: {
    fontSize: 18,
  },
  imageBanner: {
    width: 80,
    objectFit: "cover",
    height: 80,
    borderRadius: 10,
  },
  button: {
    paddingVertical: 10,
    textAlign: "center",
    backgroundColor: "#0000a7",
    color: "#fff",
    borderRadius: 10,
  },
  elevation: {
    elevation: 10,
    shadowColor: Color.primary,
  },

  topCard: {
    height: 70,
    border: "none",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.primary,
    borderBottomLeftRadius: 26,
    borderBottomRightRadius: 26,
  },
});
