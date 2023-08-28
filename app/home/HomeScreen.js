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
import { useRouter, Link } from "expo-router";
import {
  useStateContext,
  getUserInfo,
  getUserToken,
  baseUrl,
} from "./../hooks/Store";
import Color from "../constants/Color";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

import useDaerah from "./../hooks/useDaerah";
import useToken from "./../hooks/useToken";
import CardBengkel from "./../components/CardBengkel";
import Loader from "./../components/Loader";

const HomeScreen = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { state, dispatch } = useStateContext();
  const [location, setLocation] = useState("");
  const router = useRouter();
  const token = useToken();

  const getDataBengkel = async () => {
    // console.log("token", token);
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/bengkel`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.userInfo?.token,
        },
      });
      const result = await response.json();
      // console.log("Bengkel =", result.data);
      setData(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  console.log(state?.userInfo?.user);
  useEffect(() => {
    getDataBengkel();
  }, []);

  const getPermissionLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    // console.log("status", status);
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    //   console.log("getting location");
    //   // let currentLocation = await Location.watchPositionAsync(
    //   //   {
    //   //     accuracy: Location.Accuracy.Highest,
    //   //     // maximumAge: 1000,
    //   //   },
    //   //   async (loc) => {
    //   //     console.log("lokasi terupdate :", loc);
    //   //     await AsyncStorage.setItem("userLocation", JSON.stringify(loc.coords));
    //   //     dispatch({ type: "SAVE_LOCATION", payload: loc.coords });
    //   //     setLocation(loc.coords);
    //   //   }
    //   // );
    //   // setLocation(currentLocation);

    console.log("cur start", curlocation);
    let curlocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
      maximumAge: 10000,
    });

    console.log("cur end", curlocation);
    await AsyncStorage.setItem(
      "userLocation",
      JSON.stringify(curlocation.coords)
    );
    console.log("test dispatch");
    dispatch({ type: "SAVE_LOCATION", payload: curlocation.coords });
    setLocation(curlocation.coords);
  };
  // const { coords } = curlocation;

  // if (coords) {
  //   const { latitude, longitude } = coords;
  // }

  // console.log("coord :", location);
  // // console.log("lokasi", location);
  // // console.log("home =>", state?.userInfo);
  console.log("user location =>", state?.userLocation);
  // console.log("roles =>", state?.userInfo?.user?.roles[0]?.name);
  // console.log(state?.user);
  useEffect(() => {
    getPermissionLocation();
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
  return (
    <ScrollView style={{ backgroundColor: "#fff" }}>
      <View style={styles.topCard}>
        <View style={[styles.banner, styles.elevation]}>
          <Image
            style={styles.imageBanner}
            // resizeMode="cover"
            source={require("../../assets/banner/mechanic.png")}
          />
          <View style={{ gap: 6 }}>
            <Text style={styles.judul}>
              Selamat Datang{" "}
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                {sliceName(state?.userInfo?.user?.name)}
              </Text>
            </Text>
            <Text style={{ fontSize: 16, color: "#3e3e3e" }}>
              Kami siap melayani anda
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => router.push("/home/ExploreScreen")}
            >
              <Text
                style={{ color: "#fff", fontSize: 18, textAlign: "center" }}
              >
                Cari sekarang
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <Text style={{ fontSize: 16 }}>Rekomendasi :</Text>
        {/* <StatusBar /> */}
        {data?.map((item, index) => {
          return <CardBengkel explore="false" item={item} key={index} />;
        })}
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 70,
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    position: "relative",
    gap: 10,
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
