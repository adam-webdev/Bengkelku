import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";
import Color from "./constants/Color";
import { useStateContext } from "./hooks/Store";

const Card = ({ text }) => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return (
    <View style={styles.boxCard}>
      <Text style={styles.fontCard}>{text}</Text>
      <Text style={[styles.fontCard, { textAlign: "right" }]}>
        {hours}.{minutes}
      </Text>
    </View>
  );
};
const CardUser = ({ text }) => {
  let date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  return (
    <View style={[styles.boxCard, { backgroundColor: Color.primary }]}>
      <Text style={styles.fontCard}>{text}</Text>
      <Text style={[styles.fontCard, { textAlign: "right" }]}>
        {hours}.{minutes}
      </Text>
    </View>
  );
};

const ChatBot = () => {
  const { state } = useStateContext();
  // console.log("chatbot", state);
  const [pertanyaan, setPertanyaan] = useState();
  const [nomor, setNomor] = useState();
  const [jawaban, setJawaban] = useState();
  const [loading, setLoading] = useState(false);
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

  const handleKirim = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://192.168.43.175:8000/api/v1/jawaban/${nomor}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + state?.userInfo?.token,
          },
        }
      );
      const resultFetch = await response.json();
      console.log("jawaban", resultFetch);
      // console.log("Bengkel =", resultFetch.data);
      setJawaban(resultFetch.data);
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
        <Card text={"Ada Yang bisa kami Bantu ? "} />
        {pertanyaan &&
          pertanyaan.map((item, index) => (
            <Card key={index} text={item.nama_pertanyaan} />
          ))}
        <Card
          text={
            "Silahkan ketikan angka yang tersedia. Untuk memunculkan informasi yang dibutuhkan. "
          }
        />
        {nomor ? <CardUser text={nomor} /> : ""}
        {jawaban &&
          jawaban.map((item, index) => (
            <Card key={index} text={item.isi_jawaban} />
          ))}
      </ScrollView>
      <View style={styles.bottom}>
        <View style={styles.boxInput}>
          <TextInput
            // keyboardType="numeric"
            placeholder="Ketikan sesuatu..."
            value={nomor}
            onChangeText={(text) => setNomor(text)}
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
    color: "#fff",
  },
  boxCard: {
    padding: 8,
    marginTop: 6,
    backgroundColor: "#808080",
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
