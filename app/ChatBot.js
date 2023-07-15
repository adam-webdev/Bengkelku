import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import Color from "./constants/Color";
import Bot from "@expo/vector-icons/FontAwesome5";

import { useStateContext, baseUrl } from "./hooks/Store";
import { useRouter } from "expo-router";

const Card = ({ text }) => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.imageWrapper}>
        <Bot name="robot" size={24} />
      </View>
      <View style={[styles.boxCard, styles.shadowProp]}>
        <Text style={styles.fontCard}>{text}</Text>
        <Text style={[styles.fontCard, { textAlign: "right" }]}>
          {hours}.{minutes}
        </Text>
      </View>
    </View>
  );
};
const CardUser = ({ item }) => {
  const { state } = useStateContext();

  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  console.log("cardUser", item);
  const data = item.text;

  // console.log("tem state", state.userInfo.user.foto);

  if (Array.isArray(item.text)) {
    if (item.url == 2) {
      return data.map((text, index) => (
        <View
          key={index}
          style={[
            styles.cardWrapper,
            { flexDirection: item.type === "user" ? "row-reverse" : "row" },
          ]}
        >
          <View style={styles.imageWrapper}>
            {item.type === "user" ? (
              // <Image
              //   style={styles.image}
              //   source={{ uri: state.userInfo.user.foto }}
              // />
              <Bot name="user-circle" size={24} />
            ) : (
              <Bot name="robot" size={24} />
            )}
          </View>
          <View
            style={[
              styles.boxCard,
              styles.shadowProp,
              // { backgroundColor: item.type === "user" ? "#fafbff" : "#fff" },
            ]}
          >
            <Text
              style={[
                styles.fontCard,
                { color: item.type === "user" ? Color.primary : "#000" },
                { fontWeight: item.type === "user" ? "bold" : "normal" },
                { flexDirection: "column" },
              ]}
            >
              <Text>
                Nama : {text.nama_bengkel ? text.nama_bengkel : text.name},{" "}
              </Text>
              <Text>Kontak : {text.no_hp}, </Text>
              <Text>Email : {text.email}, </Text>
              {text.nama_bengkel ? (
                <Text>Alamat Detail : {text.alamat_lengkap}</Text>
              ) : (
                ""
              )}
            </Text>
            <Text style={[styles.fontCard, { textAlign: "right" }]}>
              {hours}.{minutes}
            </Text>
          </View>
        </View>
        // <View
        //   key={index}
        //   style={[
        //     styles.boxCard,
        //     {
        //       backgroundColor: item.type === "user" ? Color.primary : "#808080",
        //     },
        //   ]}
        // >
        //   <Text style={styles.fontCard}>{text}</Text>
        //   <Text style={[styles.fontCard, { textAlign: "right" }]}>
        //     {hours}.{minutes}
        //   </Text>
        // </View>
      ));
    }
    if (item.url == 3 || item.url == 4) {
      return data.map((text, index) => (
        <View
          key={index}
          style={[
            styles.cardWrapper,
            { flexDirection: item.type === "user" ? "row-reverse" : "row" },
          ]}
        >
          <View style={styles.imageWrapper}>
            {item.type === "user" ? (
              <Bot name="user-circle" size={24} />
            ) : (
              <Bot name="robot" size={24} />
            )}
          </View>
          <View style={[styles.boxCard, styles.shadowProp]}>
            <Text
              style={[
                styles.fontCard,
                { color: item.type === "user" ? Color.primary : "#000" },
                { fontWeight: item.type === "user" ? "bold" : "normal" },
              ]}
            >
              {text.name}
            </Text>
            <Text style={[styles.fontCard, { textAlign: "right" }]}>
              {hours}.{minutes}
            </Text>
          </View>
        </View>
      ));
    }
    return data.map((text, index) => (
      <View
        key={index}
        style={[
          styles.cardWrapper,
          { flexDirection: item.type === "user" ? "row-reverse" : "row" },
        ]}
      >
        <View style={styles.imageWrapper}>
          {item.type === "user" ? (
            // <Image
            //   style={styles.image}
            //   source={{ uri: state.userInfo.user.foto }}
            // />
            <Bot name="user-circle" size={24} />
          ) : (
            <Bot name="robot" size={24} />
          )}
        </View>
        <View
          style={[
            styles.boxCard,
            styles.shadowProp,
            // { backgroundColor: item.type === "user" ? "#fafbff" : "#fff" },
          ]}
        >
          <Text
            style={[
              styles.fontCard,
              { color: item.type === "user" ? Color.primary : "#000" },
              { fontWeight: item.type === "user" ? "bold" : "normal" },
            ]}
          >
            {text}
          </Text>
          <Text style={[styles.fontCard, { textAlign: "right" }]}>
            {hours}.{minutes}
          </Text>
        </View>
      </View>
    ));
  }
  return (
    <View
      // key={index}
      style={[
        styles.cardWrapper,
        { flexDirection: item.type === "user" ? "row-reverse" : "row" },
      ]}
    >
      <View style={styles.imageWrapper}>
        {item.type === "user" ? (
          <Bot name="user-circle" size={24} />
        ) : (
          <Bot name="robot" size={24} />
        )}
      </View>
      <View
        style={[
          styles.boxCard,
          styles.shadowProp,
          // { backgroundColor: item.type === "user" ? "#fafbff" : "#fff" },
        ]}
      >
        <Text
          style={[
            styles.fontCard,
            { color: item.type === "user" ? Color.primary : "#000" },
            { fontWeight: item.type === "user" ? "bold" : "normal" },
          ]}
        >
          {item.text}
        </Text>
        <Text style={[styles.fontCard, { textAlign: "right" }]}>
          {hours}.{minutes}
        </Text>
      </View>
    </View>
  );
};

const ChatBot = () => {
  const { state } = useStateContext();
  // console.log("chatbot", state);
  const [pertanyaan, setPertanyaan] = useState();
  // const [nomor, setNomor] = useState();
  const [userType, setUserType] = useState("");
  const [prevuserType, setPrevuserType] = useState("");
  // const [query, setQuery] = useState();
  const router = useRouter();
  const [data, setData] = useState([]);
  // const [jawabanQuery, setJawabanQuery] = useState();
  const [loading, setLoading] = useState(false);

  const refInput = useRef();
  const refPrevUserType = useRef();

  const LayananTersedia = [
    { name: "Service Mesin.", id: 1 },
    { name: "Tambal Ban.", id: 2 },
    { name: "Service CVT.", id: 3 },
    { name: "Ganti Oli Mesin.", id: 4 },
    { name: "Ganti Kampas Rem.", id: 5 },
    { name: "Service Kelistrikan Motor.", id: 6 },
    {
      name: 'Ketik angka "9" jika ingin kembali ke-menu awal! Ketik angka "0" Jika ingin mengakhiri chatbot!',
      id: 6,
    },
  ];

  const PetunjukPemesanan = [
    { id: 1, name: '"1" Pilih Bengkel yang tersedia.' },
    {
      id: 2,
      name: '"2" Lalu tekan tombol Hubungi pada halaman detail bengkel untuk melanjutkan pemesanan.',
    },
    {
      id: 3,
      name: '"3" Berikan keluhan melalui chat dan informasi yang akurat.',
    },
    { id: 4, name: '"4" Jika sudah montir akan mendatangi anda.' },
    {
      name: 'Ketik angka "9" jika ingin kembali ke-menu awal! Ketik angka "0" Jika ingin mengakhiri chatbot!',
      id: 6,
    },
  ];
  const getPertanyaan = async () => {
    // console.log("token", token);
    console.log("mulai");
    setLoading(true);
    try {
      const response = await fetch(`${baseUrl}/pertanyaan`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.userInfo?.token,
        },
      });
      const result = await response.json();

      setPertanyaan(result.data);
      setLoading(false);
      console.log("selesai");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPertanyaan();
  }, []);

  const handleKirim = async () => {
    setLoading(true);
    if (userType == 9) {
      setPrevuserType("");
      setData([]);
      getPertanyaan();
      refInput.current.clear();
      return;
    }
    if (userType == 3) {
      // setPrevuserType("");
      // setData([]);
      setData([
        ...data,
        { type: "user", text: userType },
        {
          type: "bot",
          text: LayananTersedia,
          url: 3,
        },
      ]);
      // getPertanyaan();
      refInput.current.clear();
      return;
    }
    if (userType == 4) {
      setData([
        ...data,
        { type: "user", text: userType },
        {
          type: "bot",
          text: PetunjukPemesanan,
          url: 4,
        },
      ]);
      refInput.current.clear();
      return;
    }
    if (userType == 0) {
      refInput.current.clear();
      setData([]);
      setPrevuserType("");
      router.back();
      return;
    }
    if (!prevuserType) {
      setPrevuserType(userType);
    }
    refInput.current.clear();
    let url1 = `${baseUrl}/jawaban/${userType}`;
    let url2 = `${baseUrl}/jawaban/${prevuserType}/${userType}`;
    try {
      const response = await fetch(prevuserType ? url2 : url1, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.userInfo?.token,
        },
      });
      const resultFetch = await response.json();

      console.log("rsult", resultFetch);

      const textResult = !resultFetch.data.length
        ? "Data tidak ditemukan. Pastikan yang anda ketikan sesuai dengan yang ada dimenu!"
        : resultFetch.data.map((item) => item.isi_jawaban);

      const dataLokasiBengkel = !resultFetch.data.length
        ? "Data tidak ditemukan. Pastikan yang anda ketikan sesuai dengan yang ada dimenu!"
        : resultFetch.data.map((item) => item);
      // console.log("jawaban", textResult);

      console.log("Bengkel =", dataLokasiBengkel);

      console.log("text result : ", textResult);
      setData([
        ...data,
        { type: "user", text: userType },
        {
          type: "bot",
          text: prevuserType ? dataLokasiBengkel : textResult,
          url: prevuserType ? 2 : "",
        },
      ]);
      setUserType("");
      setLoading(false);
      // setNomor("");

      console.log("selesai");
    } catch (err) {
      console.log(err);
    }
  };
  // if (loading) {
  //   return <Text>laoding</Text>;
  // }
  return (
    <View style={styles.container}>
      <ScrollView style={{ padding: 10 }}>
        <Card text={"Selamat datang " + state?.user?.name + " di KuvaBot."} />
        <Card
          text={
            "Ada Yang bisa kami Bantu ? Berikut menu pilihan yang bisa anda tanyakan. "
          }
        />
        {pertanyaan &&
          pertanyaan.map((item, index) => (
            <Card key={index} text={item.nama_pertanyaan} />
          ))}
        <Card
          text={
            'Silahkan ketikan angka yang tersedia. Untuk memunculkan informasi yang dibutuhkan. Jika ingin mengakhiri Percakapan Ketikan angka "0"! '
          }
        />
        {/* {userType ? <CardUser text={userType} /> : ""} */}
        {data &&
          data.map((item, index) => <CardUser key={index} item={item} />)}
        {prevuserType ? (
          <Card
            text={
              'Ketik angka "9" jika ingin kembali ke-menu awal! Ketik angka "0" Jika ingin mengakhiri chatbot!'
            }
          />
        ) : (
          ""
        )}
        {prevuserType
          ? userType == 9
            ? pertanyaan &&
              pertanyaan.map((item, index) => (
                <Card key={index} text={item.nama_pertanyaan} />
              ))
            : ""
          : ""}
      </ScrollView>
      <View style={styles.bottom}>
        <View style={styles.boxInput}>
          <TextInput
            // keyboardType="numeric"
            ref={refInput}
            placeholder="Ketikan sesuatu..."
            value={userType}
            onChangeText={(text) => setUserType(text)}
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={() => handleKirim()}>
            <Text style={styles.textButton}>Kirim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardWrapper: {
    flex: 1,
    justifyContent: "space-between",
    alignItem: "center",
    flexDirection: "row",
  },
  imageWrapper: {
    // width: 30,
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  iconImage: {},
  bottom: {
    // flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    height: 60,
  },

  image: {
    width: 30,
  },
  buttonText: {
    fontSize: 16,
    color: "white",
  },
  text: {
    margin: 20,
    color: "black",
  },
  fontCard: {
    fontSize: 17,
    color: "#000",
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  boxCard: {
    padding: 8,
    marginTop: 6,
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 6,
  },
  boxInput: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    gap: 9,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    paddingHorizontal: 10,
    fontSize: 16,
    width: "80%",
    height: 40,
    borderRadius: 4,
    paddingVertical: 12,
  },
  button: {
    width: "17%",
    height: 40,
    backgroundColor: Color.secondaryColor,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
  },
});

export default ChatBot;
