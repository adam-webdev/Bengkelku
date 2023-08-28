import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";

import Octicons from "@expo/vector-icons/Octicons";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "expo-router";
import { Stack } from "expo-router";
import { useStateContext, baseUrl } from "./hooks/Store";
import Color from "./constants/Color";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Foundation from "@expo/vector-icons/Foundation";
import IonIcons from "@expo/vector-icons/Ionicons";
import useDaerah from "./hooks/useDaerah";
import useToken from "./hooks/useToken";
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  AnimatedRegion,
  Polyline,
} from "react-native-maps";
import MapViewDirections from "react-native-maps-directions";

const GOOGLE_MAPS_APIKEY = "AIzaSyDfZm5mtVteNjhiPfSoyq7Gkhz07hUW03k";
// const GOOGLE_MAPS_APIKEY = "AIzaSyAuYand6-drJrEpJfHdPogNWyGevtUM5IQ";
const DetailOrder = ({ navigation }) => {
  const { id } = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { state } = useStateContext();
  const [location, setLocation] = useState();
  const router = useRouter();

  const markerRef = useRef();
  const mapRef = useRef();
  const screen = Dimensions.get("window");
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.05;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [stateLok, setStateLok] = useState({
    latitude: state?.userLocation?.latitude,
    longitude: state?.userLocation?.longitude,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    routeCordinates: [],
    destinationCoords: {},
    jarakDriver: 0,
    prevLatLng: {},
    coordinate: new AnimatedRegion({
      latitude: state?.userLocation?.latitude,
      longitude: state?.userLocation?.longitude,
      latitudeDelta: LATITUDE_DELTA,
      longitudeDelta: LONGITUDE_DELTA,
    }),
  });

  const {
    latitude,
    longitude,
    routeCordinates,
    jarakDriver,
    prevLatLng,
    coordinate,
    destinationCoords,
    latitudeDelta,
    longitudeDelta,
  } = stateLok;

  const updateStateLok = (data) =>
    setStateLok((stateLok) => ({ ...stateLok, ...data }));

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
      updateStateLok({
        destinationCoords: {
          latitude: parseFloat(result?.data.lat),
          longitude: parseFloat(result?.data.lng),
        },
      }),
        setData(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDetailOrder();
  }, []);

  const getLiveLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    // console.log("status", status);
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }
    console.log("getting location");
    let currentLocation = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
      },
      (loc) => {
        console.log("lokasi terupdate order:", loc);
        // result data =>lokasi terupdate order: {"coords": {"accuracy": 20, "altitude": 0, "altitudeAccuracy": 40, "heading": 0, "latitude": -7.464415, "longitude": 112.691165, "speed": 0}, "mocked": false, "timestamp": 1690650315351}
        //  await AsyncStorage.setItem(
        //    "userLocation",
        //    JSON.stringify(loc.coords)
        //  );
        //  dispatch({ type: "SAVE_LOCATION", payload: loc.coords });
        // changeAnimate(loc.coords.latitude, loc.coords.longitude);

        updateStateLok({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude,
          coordinate: new AnimatedRegion({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }),
        });
      }
    );
  };

  // setLocation(currentLocation);

  // console.log("curaatas",curlocation);
  // try {
  //   var curlocation = await Location.getCurrentPositionAsync({});
  //   console.log("cur",curlocation);
  // } catch {
  //   curlocation = await Location.getCurrentPositionAsync({});
  //   console.log(curlocation);aaa
  // }
  // useEffect(() => {
  //   getLiveLocation();
  // }, []);
  // const { coords } = curlocation;

  // if (coords) {
  //   const { latitude, longitude } = coords;
  // }
  // updateStateLok();
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     getLiveLocation();
  //   }, 7000);
  //   return () => clearInterval(interval);
  // }, []);

  const changeAnimate = (latitude, longitude) => {
    const newCoordinate = { latitude, longitude };
    if (Platform.OS == "android") {
      if (markerRef.current) {
        markerRef.current.animateMarkerToCoordinate(newCoordinate, 7000);
      }
    } else {
      coordinate.timing(newCoordinate).start();
    }
  };

  const getJarak = (newLatLng) => {
    const { prevLatLng } = this.state;
    return haversine(prevLatLng, newLatLng) || 0;
  };

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
  const handleClickMarker = (e) => {
    console.log(e.nativeEvent);
  };

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

  console.log("destionation", destinationCoords);
  // const origin = { latitude: 37.3318456, longitude: -122.0296002 };
  // const destination = { latitude: 37.771707, longitude: -122.4053769 };
  console.log("userinfo lokasi", state?.userLocation);
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
          <MapView
            style={styles.map}
            showsTraffic
            ref={mapRef}
            zoomEnabled={true}
            scrollEnabled={true}
            showsScale={true}
            followsUserLocation
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: latitudeDelta,
              longitudeDelta: longitudeDelta,
            }}
            showsUserLocation
          >
            <Polyline
              coordinates={[
                { latitude: latitude, longitude: longitude },
                destinationCoords,
              ]}
              strokeColor="red" // fallback for when `strokeColors` is not supported by the map-provider
              strokeColors={[
                "#7F0000",
                // "#00000000", // no color, creates a "long" gradient between the previous and next coordinate
              ]}
              strokeWidth={6}
            />
            <Marker.Animated ref={markerRef} coordinate={coordinate} />

            {Object.keys(destinationCoords).length > 0 && (
              <Marker
                coordinate={destinationCoords}
                title="user location"

                // image={imagePath.icGreenMarker}
              />
            )}
          </MapView>
          {/* <WebView
            originWhitelist={["*"]}
            source={{ uri: "./leaflet.js" }}
            style={{ flex: 1 }}
          /> */}
          {/* <WebView
            source={{ uri: "http://192.168.43.175:8000/order/118" }}
            style={{ flex: 1 }}
          /> */}
          <View style={styles.buttonZoomInOut}>
            <Text onPress={() => handleZoomIn()} style={styles.plusMinButton}>
              +
            </Text>
            <Text onPress={() => handleZoomOut()} style={styles.plusMinButton}>
              -
            </Text>
          </View>
        </View>
        <View style={{ height: 400 }}>
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
      </View>
    </>
  );
};

export default DetailOrder;

const styles = StyleSheet.create({
  container: {
    fontSize: 16,
    flex: 1,
  },
  boxImage: {
    // width: 50,
    // marginTop: 20,
    height: 370,
    backgroundColor: "#fff",
  },
  image: {
    objectFit: "cover",
    width: "100%",
    height: 270,
    // borderRadius: 200,
    // borderRadius: 10,
  },
  map: {
    height: 370,
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
    backgroundColor: "white",
    padding: 8,
  },
  textTitle: {
    fontSize: 18,
    fontWeight: "bold",
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
