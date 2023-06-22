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

import { useStateContext } from "./hooks/Store";

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
  console.log("cardUser", item.text);
  const data = item.text;

  console.log("tem state", state.userInfo.user.foto);

  if (Array.isArray(item.text)) {
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
  } else {
    return (
      // <View
      //   style={[
      //     styles.boxCard,
      //     { backgroundColor: item.type === "user" ? "#e0e0e0" : "#fff" },
      //   ]}
      // >
      //   <Text style={styles.fontCard}>{item.text}</Text>
      //   <Text style={[styles.fontCard, { textAlign: "right" }]}>
      //     {hours}.{minutes}
      //   </Text>
      // </View>
      <View
        // key={index}
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
            {item.text}
          </Text>
          <Text style={[styles.fontCard, { textAlign: "right" }]}>
            {hours}.{minutes}
          </Text>
        </View>
      </View>
    );
  }
};

const ChatBot = () => {
  const { state } = useStateContext();
  // console.log("chatbot", state);
  const [pertanyaan, setPertanyaan] = useState();
  // const [nomor, setNomor] = useState();
  const [userType, setUserType] = useState("");
  // const [userType2, setUserType2] = useState();
  // const [query, setQuery] = useState();

  const [data, setData] = useState([]);
  // const [jawabanQuery, setJawabanQuery] = useState();
  const [loading, setLoading] = useState(false);

  const refInput = useRef();
  // const prevNomor = usePrevious(nomor);
  const getPertanyaan = async () => {
    // console.log("token", token);
    console.log("mulai");
    setLoading(true);
    try {
      const response = await fetch(
        "http://192.168.43.175:8000/api/v1/pertanyaan/",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state?.userInfo?.token,
          },
        }
      );
      const result = await response.json();
      console.log("hasil", result);
      // console.log("Bengkel =", result.data);
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
  // function usePrevious(value) {
  //   const ref = useRef();

  //   useEffect(() => {
  //     ref.current = value;
  //   });

  //   return ref.current;
  // }
  const handleKirim = async () => {
    setLoading(true);
    // if (userType) {
    //   setUserType2(nomor);
    // }else{
    //   setUserType(nomor);
    // }

    // console.log("usertype : ", userType);
    refInput.current.clear();
    try {
      const response = await fetch(
        `http://192.168.43.175:8000/api/v1/jawaban/${userType}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state?.userInfo?.token,
          },
        }
      );
      const resultFetch = await response.json();

      console.log("rsult", resultFetch);
      const textResult = !resultFetch.data.length
        ? "Data tidak ditemukan. Pastikan yang anda ketikan sesuai dengan yang ada dimenu!"
        : resultFetch.data.map((item) => item.isi_jawaban);
      console.log("jawaban", textResult);

      // console.log("Bengkel =", resultFetch.data);
      setData([
        ...data,
        { type: "user", text: userType },
        { type: "bot", text: textResult },
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
            "Silahkan ketikan angka yang tersedia. Untuk memunculkan informasi yang dibutuhkan. "
          }
        />
        {/* {userType ? <CardUser text={userType} /> : ""} */}
        {data &&
          data.map((item, index) => <CardUser key={index} item={item} />)}
        {/* {userType2 ? <CardUser text={userType2} /> : ""} */}
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
          {/* <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Bottom Button</Text>
        </TouchableOpacity> */}
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
    // backgroundColor: "#fff",
    // borderRadius: "50%",
    // gap: 10,
  },
  iconImage: {},
  bottom: {
    // flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#fff",
    height: 60,
  },
  // button: {
  //   width: "100%",
  //   height: 50,
  //   backgroundColor: "red",
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
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
