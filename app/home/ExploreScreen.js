import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TextInput } from "react-native";
// import Mapbox from "@rnmapbox/maps";
import Color from "../constants/Color";

import { useRouter, Link } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import {
  useStateContext,
  getUserInfo,
  getUserToken,
  baseUrl,
} from "./../hooks/Store";
import Icon from "@expo/vector-icons/FontAwesome5";
import Ionicons from "@expo/vector-icons/Ionicons";

import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
const ExploreScreen = () => {
  const { state } = useStateContext();
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState();
  const router = useRouter();
  // const token = useToken();

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
      console.log("Bengkel =", result.data);
      setData(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  console.log("data", typeof data?.longitude);
  useEffect(() => {
    getDataBengkel();
  }, []);

  const getDataBengkelBySearch = async () => {
    console.log("search user :", search);
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/bengkel-search/${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.userInfo?.token,
        },
      });
      const result = await response.json();
      console.log("Bengkel by search =", result.data);
      setDataSearch(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  // console.log("dataSearch",  dataSearch);

  useEffect(() => {
    getDataBengkelBySearch();
  }, []);

  const handleClickMarker = (e) => {
    console.log(e.nativeEvent);
  };
  const handleClose = () => {
    setSearch("");
  };
  const initialLatitude = search
    ? dataSearch?.latitude
    : state?.userLocation?.latitude;

  const initialLongitude = search
    ? dataSearch?.longitude
    : state?.userLocation?.longitude;

  return (
    <View style={styles.page}>
      <MapView
        provider={PROVIDER_GOOGLE} // Specify Google Maps as the provider
        style={styles.map}
        showsTraffic
        followsUserLocation
        initialRegion={{
          latitude: initialLatitude,
          longitude: initialLongitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
      >
        {search
          ? dataSearch?.map((item, index) => (
              <Marker
                key={index}
                title={item.nama_bengkel}
                description={item.no_hp}
                coordinate={{
                  latitude: parseFloat(item.latitude),
                  longitude: parseFloat(item.longitude),
                }}
                onPress={(e) => handleClickMarker(e)}
              />
            ))
          : data?.map((item, index) => (
              <Marker
                key={index}
                title={item.nama_bengkel}
                description={item.no_hp}
                coordinate={{
                  latitude: parseFloat(item.latitude),
                  longitude: parseFloat(item.longitude),
                }}
                onPress={(e) => handleClickMarker(e)}
              />
            ))}
      </MapView>

      <View style={[styles.boxSearch, styles.elevation]}>
        <TextInput
          style={styles.input}
          value={search}
          onChangeText={(text) => setSearch(text)}
          placeholder="Cari bengkel..."
        />
        {search ? (
          <Ionicons
            onPress={() => handleClose()}
            name="close"
            size={20}
            style={styles.close}
          />
        ) : (
          ""
        )}
        <Icon
          onPress={() => getDataBengkelBySearch()}
          color={"white"}
          style={styles.icon}
          size={24}
          name="search"
        />
      </View>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
  },
  boxSearch: {
    position: "absolute",
    flexDirection: "row",
    width: "94%",
    margin: 10,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    fontSize: 16,
  },
  elevation: {
    elevation: 20,
    shadowColor: "black",
  },
  icon: {
    backgroundColor: Color.primary,
    padding: 10,
    borderRadius: 4,
  },
  close: {
    position: "absolute",
    right: 50,
    backgroundColor: "#e3e3e3",
    borderRadius: 20,
    padding: 2,
  },
  input: {
    padding: 10,
  },
  map: {
    flex: 1,
  },
});
