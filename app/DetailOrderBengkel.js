import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from "react-native";
import customUserLocationIcon from "../assets/img/iconmotor.png";
import * as Location from "expo-location";
import Octicons from "@expo/vector-icons/Octicons";
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter, Stack } from "expo-router";
import { useStateContext, baseUrl } from "./hooks/Store";
import Color from "./constants/Color";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Foundation from "@expo/vector-icons/Foundation";
// import IonIcons from "@expo/vector-icons/Ionicons";
import useDaerah from "./hooks/useDaerah";
import Mapbox from "@rnmapbox/maps";
// import Geolocation from "@react-native-community/geolocation";
import { useNavigation, useRoute } from "@react-navigation/native";
// import {APIKEY} from '../utils/key';
import ColorfulCard from "@freakycoder/react-native-colorful-card";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import SimpleIcon from "react-native-vector-icons/SimpleLineIcons";
import Ionicons from "react-native-vector-icons/MaterialIcons";

// Logger.setLogCallback((log) => {
//   const { message } = log;

//   if (
//     message.match("Request failed due to a permanent error: Canceled") ||
//     message.match("Request failed due to a permanent error: Socket Closed")
//   ) {
//     return true;
//   }
//   return false;
// });
const APIKEY =
  "pk.eyJ1IjoiYWNlbmdycGgiLCJhIjoiY2xqbWw5dHBtMTA0dDN0cGJtNGZmMzJidiJ9.Fue2Wxs6TUoFjyBMXgK8Wg";
Mapbox.setAccessToken(
  "pk.eyJ1IjoiYWNlbmdycGgiLCJhIjoiY2xqbWw5dHBtMTA0dDN0cGJtNGZmMzJidiJ9.Fue2Wxs6TUoFjyBMXgK8Wg"
);
// Mapbox.setConnected(true);
// Mapbox.setTelemetryEnabled(false);
// Mapbox.setWellKnownTileServer("Mapbox");
// Geolocation.setRNConfiguration({
//   skipPermissionRequests: false,
//   authorizationLevel: "auto",
// });

const routeProfiles = [
  { id: "walking", label: "Walking", icon: "walking" },
  { id: "cycling", label: "Cylcing", icon: "bicycle" },
  { id: "driving", label: "Driving", icon: "car" },
];
const DetailOrderBengkel = () => {
  const [routeDirections, setRouteDirections] = useState(null);
  // const [coords, setCoords] = useState([12.48839, 50.72724]);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);
  // const [destinationCoords, setDestinationCoords] = useState([
  //   12.48839, 50.72724,
  // ]);
  const [selectedRouteProfile, setselectedRouteProfile] = useState("walking");
  // const route = useRoute();
  const navigation = useNavigation();
  const { id } = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { state } = useStateContext();
  const [location, setLocation] = useState([]);
  const [button, setButton] = useState(false);
  const [statusOrder, setStatusOrder] = useState();
  const router = useRouter();

  const intervalRef = useRef(null);
  const mapRef = useRef();
  const screen = Dimensions.get("window");
  const ASPECT_RATIO = screen.width / screen.height;
  const LATITUDE_DELTA = 0.05;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const [stateLok, setStateLok] = useState({
    latitude: "",
    longitude: "",
    heading: 90,
    // coords: [12.48839, 50.72724],
    coords: [state?.userLocation?.longitude, state?.userLocation?.latitude],
    // coords: [-7.379778, 112.639269],
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
    routeCordinates: [-7.379778, 112.639269],
    lokasiUser: [-7.379778, 112.639269],
    lokasiMontir: [
      state?.userLocation?.longitude,
      state?.userLocation?.latitude,
    ],

    // destinationCoordss: [-7.379897793082899, 112.63985632918775],

    jarakDriver: 0,
    prevLatLng: {},
  });

  const {
    latitude,
    longitude,
    heading,
    routeCordinates,
    jarakDriver,
    prevLatLng,
    coords,
    lokasiUser,
    lokasiMontir,
    latitudeDelta,
    longitudeDelta,
  } = stateLok;

  const updateStateLok = (data) => {
    setStateLok((stateLok) => ({ ...stateLok, ...data }));
  };
  const getPermissionLocation = async () => {
    let isMounted = true;
    let { status } = await Location.requestForegroundPermissionsAsync();
    // console.log("status", status);
    if (status !== "granted") {
      console.log("Permission to access location was denied");
      return;
    }

    console.log("tracking screen start", curlocation);
    let curlocation = await Location.getCurrentPositionAsync({
      accuracy: Location.Accuracy.Highest,
      maximumAge: 10000,
    });

    if (intervalRef.current) {
      updateStateLok({
        heading: curlocation?.coords.heading,
        lokasiMontir: [
          curlocation?.coords.longitude,
          curlocation?.coords.latitude,
        ],
      });
      await sendDataTrack(
        curlocation?.coords.heading,
        curlocation?.coords.longitude,
        curlocation?.coords.latitude
      );
    }

    if (isMounted) {
      await createRouterLine(
        curlocation?.coords.longitude,
        curlocation?.coords.latitude
      );
      updateStateLok({
        coords: [curlocation?.coords?.longitude, curlocation?.coords?.latitude],
      });
      console.log("tracking end", curlocation);

      setLocation(curlocation.coords);
    }
  };
  // const { store } = route.params;
  // console.log(coords)
  // const getLiveLocation = async () => {
  //   // let { status } = await Location.requestForegroundPermissionsAsync();
  //   // // console.log("status", status);
  //   // if (status !== "granted") {
  //   //   console.log("Permission to access location was denied");
  //   //   return;
  //   // }
  //   console.log("getting location");
  //   let currentLocation = await Location.watchPositionAsync(
  //     {
  //       accuracy: Location.Accuracy.Highest,
  //       // maximumAge: 1000,
  //     },
  //     (loc) => {
  //       // console.log("lokasi terupdate order:", loc);
  //       // result data =>lokasi terupdate order: {"coords": {"accuracy": 20, "altitude": 0, "altitudeAccuracy": 40, "heading": 0, "latitude": -7.464415, "longitude": 112.691165, "speed": 0}, "mocked": false, "timestamp": 1690650315351}

  //       // changeAnimate(loc.coords.latitude, loc.coords.longitude);
  //       sendDataTrack(loc.coords.longitude, loc.coords.latitude);

  //       updateStateLok({
  //         latitude: loc.coords.latitude,
  //         longitude: loc.coords.longitude,
  //       });

  //       updateStateLok({
  //         coords: [loc.coords.longitude, loc.coords.latitude],
  //       });
  //     }
  //   );
  // };
  // console.log("lt", data?.lat);
  // console.log("lg", data?.lng);
  // async function getPermissionLocation() {
  //   try {
  //     const geo = await Geolocation.getCurrentPosition(
  //       (location) =>
  //         setCoords([location.coords.longitude, location.coords.latitude]),
  //       (err) => console.log(err),
  //       { enableHighAccuracy: true }
  //     );
  //   } catch (error) {
  //     console.error("Error getting location", error);
  //   }
  // }

  // useEffect(() => {
  //   intervalRef.current = setInterval(() => {
  //     // getLiveLocation();
  //     getPermissionLocation();
  //   }, 20000);
  // }, []);

  // console.log(intervalRef.current)
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (button) {
  //       console.log("ini dalam interval", latitude, longitude);
  //       // getLiveLocation();
  //       sendDataTrack();
  //     }
  //   }, 20000);
  //   if (button === false) {
  //     return () => clearInterval(interval);
  //   }
  // }, [button]);

  // useEffect(() => {
  //   //console.log(store.longitude);
  //   if (selectedRouteProfile !== null) {
  //     createRouterLine(coords, selectedRouteProfile);
  //   }
  // }, [selectedRouteProfile]);
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
        lokasiUser: [
          parseFloat(result?.data.lng),
          parseFloat(result?.data.lat),
        ],
      }),
        setData(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  const orderStatusUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/order-status-update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.userInfo?.token,
        },
      });
      const result = await response.json();
      console.log("detail Order =", result.data);
      setStatusOrder(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDetailOrder();
  }, []);

  useEffect(() => {
    getPermissionLocation();
  }, []);

  const sendDataTrack = async (heading, lng, lat) => {
    console.log("mulai post data track");
    try {
      const response = await fetch(`${baseUrl}/tracking`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.userInfo?.token,
        },
        body: JSON.stringify({
          bengkel_id: data?.bengkel_id,
          heading,
          lng,
          lat,
        }),
      });
      const result = await response.json();
      if (result.success) {
        console.log("hasil track ==> ", result);
      }
    } catch (err) {
      console.log("error track is :", err);
    }
  };

  const handleButtonMulai = () => {
    setButton(true);
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        getPermissionLocation();
        isMounted = false;
      }, 60000);
    }
  };

  const handleButtonSelesai = () => {
    setButton(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      isMounted = false;
      handleButtonSelesai();
    };
  }, []);
  function makeRouterFeature(coordinates) {
    let routerFeature = {
      type: "FeatureCollection",
      features: [
        {
          type: "Feature",
          properties: {},
          geometry: {
            type: "LineString",
            coordinates: coordinates,
          },
        },
      ],
    };
    return routerFeature;
  }

  const createRouterLine = async (lng, lat) => {
    // const startCoords = `${coords[0]},${coords[1]}`;
    const startCoords = `${lng},${lat}`;
    const endCoords = `${lokasiUser[0]},${lokasiUser[1]}`;
    console.log("start :", startCoords);
    // console.log("coord :", coords);
    // console.log("end :", endCoords);
    const geometries = "geojson";
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${startCoords};${endCoords}?alternatives=true&geometries=${geometries}&steps=true&banner_instructions=true&overview=full&voice_instructions=true&access_token=${APIKEY}`;

    try {
      let response = await fetch(url);
      let json = await response.json();
      console.log("result mapbox:", json);
      const dataResult = json.routes.map((dataResult) => {
        console.log(dataResult);
        setDistance((dataResult.distance / 1000).toFixed(2));
        setDuration((dataResult.duration / 3600).toFixed(2));
      });

      let coordinates = json["routes"][0]["geometry"]["coordinates"];
      let destinationCoordinates =
        json["routes"][0]["geometry"]["coordinates"].slice(-1)[0];
      // console.log("slice ", destinationCoordinates);
      // setRo(destinationCoordinates);
      // console.log("desti", destinationCoordinates);
      updateStateLok({
        routeCordinates: destinationCoordinates,
      });
      if (coordinates.length) {
        const routerFeature = makeRouterFeature([...coordinates]);
        setRouteDirections(routerFeature);
      }
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };

  // console.log("route cordinates", routeCordinates);
  // const renderItem = ({ item }) => (
  //   <TouchableOpacity
  //     style={[
  //       styles.routeProfileButton,
  //       item.id == selectedRouteProfile && styles.selectedRouteProfileButton,
  //     ]}
  //     onPress={() => setselectedRouteProfile(item.id)}
  //   >
  //     <Icon
  //       name={item.icon}
  //       size={24}
  //       color={
  //         item.id == selectedRouteProfile ? "white" : "rgba(255,255,255,0.6)"
  //       }
  //     />
  //     <Text
  //       style={[
  //         styles.routeProfileButtonText,
  //         item.id == selectedRouteProfile &&
  //           styles.selectedRouteProfileButtonText,
  //       ]}
  //     >
  //       {item.label}
  //     </Text>
  //   </TouchableOpacity>
  // );

  // console.log("type data routecordinates: ", routeCord`inates);
  return (
    <View style={styles.container}>
      <Mapbox.MapView
        style={styles.map}
        scaleBarEnabled={false}
        onPress={(e) => console.log(e)}
        compassEnabled={true}
        zoomEnabled={true}
        // styleURL="mapbox://styles/mapbox/streets-v12"
        styleURL="mapbox://styles/mapbox/navigation-day-v1"
        // styleURL="mapbox://styles/mapbox/navigation-night-v1"
        // rotateEnabled={true}
        onDidFinishLoadingMap={async () => {
          await createRouterLine(
            state?.userLocation?.longitude,
            state?.userLocation?.latitude
          );
          // await createRouterLine(coords, selectedRouteProfile);
        }}
      >
        <Mapbox.Camera
          zoomLevel={12}
          centerCoordinate={lokasiMontir}
          animationMode={"flyTo"}
          animationDuration={6000}
        />
        {routeDirections && (
          <Mapbox.ShapeSource id="line1" shape={routeDirections}>
            <Mapbox.LineLayer
              id="routerLine01"
              style={{
                lineColor: Color.primary,
                lineWidth: 4,
              }}
            />
          </Mapbox.ShapeSource>
        )}
        {console.log(coords, "ini coords")}
        {console.log(lokasiUser, "ini lokasiUser")}
        {lokasiUser && (
          <Mapbox.MarkerView id="destinationPoint" coordinate={lokasiUser}>
            <Mapbox.Callout title="Lokasi anda" />
            <View style={styles.destinationIcon}>
              <SimpleIcon
                name="location-pin"
                size={24}
                color={Color.secondaryColor}
              />
            </View>
          </Mapbox.MarkerView>
        )}

        {lokasiMontir && (
          <Mapbox.MarkerView id="montirLokasi" coordinate={lokasiMontir}>
            <View style={styles.destinationIcon}>
              {/* <Icon name="user-circle" size={24} color="#E1710A" /> */}
              <Image
                source={require("../assets/img/iconmotor.png")}
                style={{
                  width: 40,
                  height: 40,
                  transform: [{ rotate: `${heading}deg` }],
                }}
                resizeMode="cover"
              />
            </View>
          </Mapbox.MarkerView>
        )}

        {/* <Mapbox.UserLocation
          visible={true}
          animated={true}
          customMarker={
            <Image
              source={customUserLocationIcon}
              style={{ width: 24, height: 24 }}
            />
          }
          onUpdate={(location) => {
            // Handle pembaruan lokasi pengguna di sini
            console.log("ini user loction", location);
          }}
          androidRenderMode="normal"
          showsUserHeadingIndicator={true}
        /> */}
      </Mapbox.MapView>
      {/* <FlatList
        data={routeProfiles}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.routeProfileList}
        showsHorizontalScrollIndicator={false}
        style={styles.flatList}
      /> */}

      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <FontAwesome5 name="arrow-left" size={24} color="#ffffff" />
      </TouchableOpacity>
      {loading ? (
        <ActivityIndicator
          size="large"
          color="white"
          style={styles.loadingIndicator}
        />
      ) : (
        routeDirections && (
          <View style={styles.cardContainer}>
            <View
              style={[
                styles.card,
                {
                  backgroundColor:
                    button === false ? Color.secondaryColor : "#00AA13", // Ganti backgroundColor dengan properti yang benar
                },
              ]}
            >
              <Text style={styles.title}>Waktu </Text>
              <Text style={styles.content}>{duration} jam</Text>
              <Text style={styles.title}>Jarak</Text>
              <Text style={styles.content}>{distance} km</Text>
            </View>
          </View>
        )
      )}
      {button === false ? (
        <TouchableOpacity
          style={styles.buttonMulai}
          onPress={() => handleButtonMulai()}
        >
          <Text style={styles.textButtonMulai}>Berangkat</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.buttonMulai}
          onPress={() => {
            handleButtonSelesai(), orderStatusUpdate();
          }}
        >
          <Text style={styles.textButtonSelesai}>Selesai</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default DetailOrderBengkel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  card: {
    backgroundColor: Color.secondaryColor,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap: 3,
    borderRadius: 8,
  },
  title: {
    color: "#fff",
  },
  content: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 10,
    zIndex: 1,
    backgroundColor: "rgba(0, 0 ,0 , 0.5)",
    borderRadius: 20,
    padding: 8,
  },
  loadingIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
    zIndex: 2,
  },
  cardContainer: {
    position: "absolute",
    top: 50,
    right: 10,
    zIndex: 1,
  },

  destinationIcon: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  routeProfileList: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  flatList: {
    position: "absolute",
    bottom: 20,
    left: Dimensions.get("window").width / 2 - 40,
    right: 0,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  buttonMulai: {
    position: "absolute",
    bottom: 0,
    padding: 10,
    width: "100%",
  },
  textButtonMulai: {
    color: "#fff",
    backgroundColor: Color.secondaryColor,
    paddingHorizontal: 10,
    paddingVertical: 12,
    textAlign: "center",
    fontSize: 22,
    borderRadius: 50,
    fontWeight: 600,
  },
  textButtonSelesai: {
    color: "#fff",
    backgroundColor: "#00AA13",
    paddingHorizontal: 10,
    paddingVertical: 12,
    textAlign: "center",
    fontSize: 22,
    borderRadius: 50,
    fontWeight: 600,
  },
  routeProfileButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginHorizontal: 8,
    borderColor: "#fff",
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  selectedRouteProfileButton: {
    backgroundColor: "#FA9E14",
    borderColor: "#FA9E14",
  },
  routeProfileButtonText: {
    color: "#fff",
    marginTop: 5,
  },
  selectedRouteProfileButtonText: {
    color: "white",
  },
});
