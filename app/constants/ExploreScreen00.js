import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
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
import CardBengkel from "./../components/CardBengkel";

const ExploreScreen = () => {
  const { state } = useStateContext();
  const [data, setData] = useState([]);
  const [dataSearch, setDataSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState();
  const router = useRouter();
  const mapRef = useRef();
  // const token = useToken();

  const screen = Dimensions.get("window");
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.05;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [region, setRegion] = useState({
    latitude: state?.userLocation?.latitude,
    longitude: state?.userLocation?.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });

  const { latitude, longitude, latitudeDelta, longitudeDelta } = region;

  const updateStateLok = (data) =>
    setRegion((region) => ({ ...region, ...data }));

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
  // const initialLatitude = search
  //   ? parseFloat(dataSearch?.latitude)
  //   : state?.userLocation?.latitude;

  // const initialLongitude = search
  //   ? parseFloat(dataSearch?.longitude)
  //   : state?.userLocation?.longitude;

  const handleZoomIn = () => {
    updateStateLok({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta / 2,
      longitudeDelta: longitudeDelta / 2,
    });
    mapRef.current.animateToRegion(
      {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: latitudeDelta / 2,
        longitudeDelta: longitudeDelta / 2,
      },
      100
    );
  };

  const handleZoomOut = () => {
    updateStateLok({
      latitude: latitude,
      longitude: longitude,
      latitudeDelta: latitudeDelta * 2,
      longitudeDelta: longitudeDelta * 2,
    });
    mapRef.current.animateToRegion(
      {
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: latitudeDelta * 2,
        longitudeDelta: longitudeDelta * 2,
      },
      100
    );
  };
  return (
    <View style={styles.page}>
      <View>
        <MapView
          provider={PROVIDER_GOOGLE} // Specify Google Maps as the provider
          style={styles.map}
          showsTraffic
          ref={mapRef}
          followsUserLocation
          initialRegion={{ latitude, longitude, latitudeDelta, longitudeDelta }}
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
        <View style={styles.buttonZoomInOut}>
          <Text onPress={() => handleZoomIn()} style={styles.plusMinButton}>
            +
          </Text>
          <Text onPress={() => handleZoomOut()} style={styles.plusMinButton}>
            -
          </Text>
        </View>
      </View>
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
          size={20}
          name="search"
        />
      </View>
      <ScrollView style={styles.wrappCard}>
        <View style={styles.container}>
          {search
            ? dataSearch?.map((item, index) => {
                return <CardBengkel explore="true" item={item} key={index} />;
              })
            : data?.map((item, index) => {
                return <CardBengkel explore="true" item={item} key={index} />;
              })}
        </View>
      </ScrollView>
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
  container: {
    backgroundColor: "#fff",
    paddingVertical: 20,
    paddingHorizontal: 20,
    position: "relative",
    gap: 10,
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
    borderRadius: 4,
  },
  wrappCard: {
    backgroundColor: "#fff",
    height: 100,
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
    padding: 7,
  },
  map: {
    height: 380,
  },
  buttonZoomInOut: {
    position: "absolute",
    width: 24,
    right: 0,
    bottom: 0,
    marginRight: 10,
    marginBottom: 10,
    gap: 1,
  },
  plusMinButton: {
    padding: 2,
    textAlign: "center",
    fontWeight: "bold",
    backgroundColor: "#fff",
    color: "#000",
    fontSize: 18,
    elevation: 2,
  },
});
