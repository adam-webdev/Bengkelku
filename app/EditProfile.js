import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Octicons from "@expo/vector-icons/Octicons";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "expo-router";
import { Stack } from "expo-router";
import { useStateContext } from "./hooks/Store";
import Color from "./constants/Color";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Foundation from "@expo/vector-icons/Foundation";
import IonIcons from "@expo/vector-icons/Ionicons";
import useDaerah from "./hooks/useDaerah";
import useToken from "./hooks/useToken";
import SelectDropdown from "react-native-select-dropdown";
import * as Location from "expo-location";

const EditProfile = ({ navigation }) => {
  const { id } = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [region, setRegion] = useState("");
  const { state } = useStateContext();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telp, setTelp] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const jenis_kelamin = ["Laki-laki", "Perempuan"];

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      let filename = result.assets[0].uri.split("/").pop();
      setImage(filename);
    }
  };
  // console.log("file => ", filename);

  const getDetailProfil = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://192.168.43.175:8000/api/v1/user/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state?.userInfo?.token,
          },
        }
      );
      const result = await response.json();
      console.log("profil =", result.data);
      setData(result.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDetailProfil();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      // Location.setGoogleApiKey(apiKey);
      console.log("status location", state?.userLocation?.latitude);

      let regionName = await Location.reverseGeocodeAsync({
        // latitude: 19.2514799,
        // longitude: 75.7138884,
        latitude: state?.userLocation?.latitude,
        longitude: state?.userLocation?.longitude,
      });

      setRegion(regionName);
      console.log(regionName, "nothing");

      // console.log();
    })();
  }, []);

  const provinsi = useDaerah(data?.provinsi_id, "provinsi");
  const kota = useDaerah(data?.kota_id, "kota");
  const kecamatan = useDaerah(data?.kecamatan_id, "kecamatan");
  const desa = useDaerah(data?.desa_id, "desa");

  // console.log("location", state?.userLocation);
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
    <ScrollView style={styles.wrapper}>
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
      <View style={styles.container}>
        <View style={styles.boxImage}>
          {data?.foto ? (
            <>
              <Image style={styles.image} source={{ uri: data?.foto }} />
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: Color.primary,
                  padding: 8,
                  borderRadius: 4,
                  gap: 3,
                  marginTop: 6,
                }}
                onPress={() => pickImage()}
              >
                <FontAwesome name={"camera"} color={"#fff"} size={18} />
                <Text style={{ color: "#fff" }}>Ubah Foto</Text>
              </TouchableOpacity>
            </>
          ) : (
            <Image
              style={styles.image}
              source={require("../assets/img/bengkel.jpg")}
            />
          )}
          {data?.name ? (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TextInput
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  marginTop: 10,
                  marginRight: 10,
                }}
                value={name}
                onChangeText={(text) => setName(text)}
              >
                {data?.name}
              </TextInput>
              <FontAwesome name={"pencil"} color={Color.primary} size={14} />
            </View>
          ) : (
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 10 }}>
              {/* {data?.nama_bengkel}  */}
              Adam dwi maulana
            </Text>
          )}
          {/* <Text>
            {kota?.name}, {provinsi?.name}
          </Text> */}
          <Text>
            {data?.tipe_user === "Admin Bengkel" ? "(User Bengkel)" : "(User)"}
          </Text>
        </View>
        <View style={{ width: "100%" }}>
          {/* <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            {data?.nama_bengkel}
          </Text> */}
          <Text
            style={{
              fontSize: 18,
              marginBottom: 5,
              marginTop: 5,
              fontWeight: "bold",
              marginLeft: 10,
            }}
          >
            Detail :
          </Text>

          <View style={styles.itemWrapp}>
            <Foundation
              size={22}
              style={styles.icon}
              name="telephone"
              color={Color.primary}
            />
            <TextInput
              style={styles.itemText}
              value={telp}
              keyboardType="numeric"
              onChangeText={(text) => setTelp(text)}
            >
              {" "}
              {data?.no_hp}
            </TextInput>
            <FontAwesome name={"pencil"} color={Color.primary} size={14} />
          </View>
          <View style={styles.itemWrapp}>
            <MaterialCommunityIcons
              size={22}
              style={styles.icon}
              name="email"
              color={Color.primary}
            />
            <TextInput
              style={styles.itemText}
              value={email}
              onChangeText={(text) => setEmail(text)}
            >
              {" "}
              {data?.email}{" "}
            </TextInput>
            <FontAwesome name={"pencil"} color={Color.primary} size={14} />
          </View>
          {/* <View style={[styles.itemWrapp, { alignItems: "center" }]}>
            <IonIcons
              size={22}
              style={styles.icon}
              name="location"
              color={Color.primary}
            />
            <Text style={[styles.itemText, { fontWeight: "bold" }]}>
              Alamat :
            </Text>
          </View> */}
          <View style={styles.itemWrapp}>
            <Text style={styles.itemText}>Jenis Kelamin :</Text>

            <SelectDropdown
              data={jenis_kelamin}
              // defaultValueByIndex={1}
              // defaultValue={'Egypt'}
              onSelect={(selectedItem, index) => {
                setJenisKelamin(selectedItem);
              }}
              defaultButtonText={"-- Pilih opsi --"}
              buttonTextAfterSelection={(selectedItem, index) => {
                return selectedItem;
              }}
              dropdownStyle={styles.dropdown}
              rowTextForSelection={(item, index) => {
                return item;
              }}
              buttonStyle={styles.dropdown1BtnStyle}
              buttonTextStyle={styles.dropdown1BtnTxtStyle}
              renderDropdownIcon={(isOpened) => {
                return (
                  <FontAwesome
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    color={"#444"}
                    size={14}
                  />
                );
              }}
              dropdownIconPosition={"right"}
              dropdownStyle={styles.dropdown1DropdownStyle}
              rowStyle={styles.dropdown1RowStyle}
              rowTextStyle={styles.dropdown1RowTxtStyle}
            />
            <FontAwesome name={"pencil"} color={Color.primary} size={14} />
          </View>

          <View style={styles.itemWrapp}></View>
        </View>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: 18,
          }}
        >
          Simpan Perubahan
        </Text>
        <Octicons
          name="chevron-right"
          style={{ color: "#fff", fontSize: 20 }}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  wrapper: {
    height: 100,
    // backgroundColor: "#0000a7",
  },
  container: {
    // backgroundColor: "#fff",
    // margin: 10,
    // paddingHorizontal: 10,
    fontSize: 16,
    flex: 1,
  },
  boxImage: {
    // width: 50,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  image: {
    objectFit: "cover",
    width: 200,
    marginTop: 10,
    height: 200,
    borderRadius: 200,
    // borderRadius: 10,
  },
  itemWrapp: {
    // justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
    borderRadius: 4,
    backgroundColor: "#fff",
    paddingVertical: 10,
    alignItems: "center",
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
    marginRight: 14,
    maxWidth: "90%",
    // borderWidth: 1,
    // borderColor: "grey",
    // borderBottom: 1,
    // width: 100,a
  },
  icon: {
    marginRight: 10,
  },
  dropdown: {
    height: 30,
    borderRadius: 4,
  },
  button: {
    backgroundColor: Color.primary,
    // backgroundColor: "#0000a7",
    // color: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 14,
    width: "100%",
    // marginHorizontal: 10,
    // borderRadius: 8,
  },
  inputText: {
    borderWidth: 1,
    color: "grey",
  },
  dropdown1BtnStyle: {
    width: "50%",
    height: 30,
    backgroundColor: "#FFF",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#444",
  },
  dropdown1BtnTxtStyle: { color: "#444", textAlign: "left" },
});
