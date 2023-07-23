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
import { useSearchParams, useLocalSearchParams, useRouter } from "expo-router";
import { Stack } from "expo-router";
import { useStateContext, baseUrl } from "./hooks/Store";
import Color from "./constants/Color";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Foundation from "@expo/vector-icons/Foundation";
import IonIcons from "@expo/vector-icons/Ionicons";
import useDaerah from "./hooks/useDaerah";
import useToken from "./hooks/useToken";
import SelectDropdown from "react-native-select-dropdown";
import * as Location from "expo-location";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EditProfile = ({ navigation }) => {
  const { id } = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [region, setRegion] = useState("");
  const { state, dispatch } = useStateContext();
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [image, setImage] = useState();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [telp, setTelp] = useState();
  const [jenisKelamin, setJenisKelamin] = useState();
  const jenis_kelamin = [
    "Laki-laki",
    "Perempuan",
    "asadfaef",
    "asadfasf",
    "dasafdfaa",
    "Fdsfa",
    "dasfaeaftew",
    "et43534",
    "y5y5y",
    "y5y5y",
    "y5y5y",
    "y5y5y",
    "y5y5y",
    "y5y5y",
    "y5y5y",
    "y5y5y",
    "y5y5y",
    "y5y5y",
    "y5y5y",
  ];
  const router = useRouter();
  // const { nameParams, emialParams, telpParams } = params;
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      // console.log(result.assets[0]);
      let filename = result.assets[0];

      // let filename = result.assets[0].uri.split("/").pop();
      // let filename = result.assets[0].uri;
      setImage(filename);
    }
  };

  const getDetailProfil = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.userInfo?.token,
        },
      });
      const result = await response.json();
      console.log("profil =", result.data);
      setData(result.data);
      setName(result.data.name);
      setEmail(result.data.email);
      setTelp(result.data.no_hp);

      // let filename = result.data.foto.split("/").pop();
      // setImage(filename);
      setJenisKelamin(result.data.jenis_kelamin);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getDetailProfil();
  }, []);
  // const getExtention = (fileExtension) => {
  //   switch (fileExtension) {
  //     case "application/pdf":
  //       return ".pdf";
  //     case "image/jpeg":
  //       return ".jpg";
  //     case "image/jpg":
  //       return ".jpg";
  //     case "image/png":
  //       return ".png";
  //     default:
  //       return ".jpg";
  //   }
  // };
  // console.log("for-mdata", formData);
  const handlePerubahan = async () => {
    setLoading(true);
    setError(false);
    // const typeFile = fileExtension(image);
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("no_hp", telp);
    if (image) {
      const uriParts = image.uri.split(".");
      // console.log("uri", uriParts);
      const fileType = uriParts[uriParts.length - 1];
      console.log("uri", uriParts, "file type", fileType);
      formData.append("foto", {
        name: "profilePic",
        type: `image/${fileType}`,
        uri:
          Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
      });
    }

    formData.append("jenis_kelamin", jenisKelamin);

    try {
      console.log("form-data", formData);
      console.log("mulai");
      const response = await fetch(`${baseUrl}/user/${id}`, {
        headers: {
          // "Content-Type": "application/json",
          // "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + state?.userInfo?.token,
          // "Content-Type":
          //   "multipart/form-data; charset=utf-8; boundary=" +
          //   Math.random().toString().substr(2),
        },
        method: "POST",
        body: formData,
      });
      console.log("selesai", response);
      const result = await response.json();
      console.log("resultan", result);
      // getDetailProfil();
      await AsyncStorage.removeItem("userInfo");
      await AsyncStorage.setItem("userInfo", JSON.stringify(result.data));
      dispatch({ type: "UPDATE_PROFIL", payload: result.data });
      setLoading(false);
      router.push("/DetailProfil/?id=" + id);
    } catch (error) {
      console.log("error = ", error);
    }
  };
  // useEffect(() => {
  //   (async () => {
  //     let { status } = await Location.requestForegroundPermissionsAsync();
  //     if (status !== "granted") {
  //       setErrorMsg("Permission to access location was denied");
  //     }
  //     // Location.setGoogleApiKey(apiKey);
  //     console.log("status location", state?.userLocation?.latitude);

  //     let regionName = await Location.reverseGeocodeAsync({
  //       // latitude: 19.2514799,
  //       // longitude: 75.7138884,
  //       latitude: state?.userLocation?.latitude,
  //       longitude: state?.userLocation?.longitude,
  //     });

  //     setRegion(regionName);
  //     console.log(regionName, "nothing");

  //     // console.log();
  //   })();
  // }, []);

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
        style={{ flex: 2 }}
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
                <FontAwesome name="camera" color={"#fff"} size={18} />
                <Text style={{ color: "#fff" }}>Ubah Foto</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Image
                style={styles.image}
                source={require("../assets/img/bengkel.jpg")}
              />
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
                <FontAwesome name="camera" color={"#fff"} size={18} />
                <Text style={{ color: "#fff" }}>Ubah Foto</Text>
              </TouchableOpacity>
            </>
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
                // placeholder={data?.name}
                // defaultValue={data?.name}
                // value={name ? name : data?.name}
                value={name}
                onChangeText={(text) => setName(text)}
              />
              <FontAwesome name="pencil" color={Color.primary} size={14} />
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
              // value={telp ? telp : data?.no_hp}
              value={telp}
              keyboardType="numeric"
              // placeholder={data?.no_hp}
              // defaultValue={data?.no_hp}
              onChangeText={(text) => setTelp(text)}
            />
            <FontAwesome name="pencil" color={Color.primary} size={14} />
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
              // value={email ? email : data?.email}
              value={email}
              // placeholder={data?.email}
              // defaultValue={data?.email}
              onChangeText={(text) => setEmail(text)}
            />
            <FontAwesome name="pencil" color={Color.primary} size={14} />
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
              defaultValue={jenisKelamin}
              defaultButtonText={jenisKelamin}
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
            <FontAwesome name="pencil" color={Color.primary} size={14} />
          </View>
        </View>
      </View>
      <View style={styles.wrappButton}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handlePerubahan()}
        >
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
      </View>
    </ScrollView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    flexDirection: "column",
    // backgroundColor: "#0000a7",
  },
  container: {
    // backgroundColor: "#fff",
    // margin: 10,
    // paddingHorizontal: 10,
    fontSize: 16,
    flex: 3,
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
  wrappButton: {
    marginTop: 15,
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
