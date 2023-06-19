import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  // Dimensions,
} from "react-native";
// import Color from "../constants/Color";s

import React from "react";

const Card = () => {
  return (
    <View style={styles.boxCard}>
      <Text style={styles.fontCard}>
        Selamat Datang adam. Ada yang bisa bengkelbot bantu?
      </Text>
      <Text style={[styles.fontCard, { textAlign: "right" }]}>19.00</Text>
    </View>
  );
};

const ChatBot = () => {
  // const { width, height } = Dimensions.get("window");
  return (
    <ScrollView style={styles.wrapper}>
      <View style={styles.container}>
        {/* <Image
          source={require("../../assets/img/bgwa.jpg")}
          resizeMode="cover"
          style={styles.image}
        /> */}
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <View style={styles.boxInput}>
          <TextInput placeholder="Ketikan sesuatu..." style={styles.input} />
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Kirim</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default ChatBot;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    // background: "../../assets/img/bg wa.jpg",
    padding: 10,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    height: "100%",
  },
  boxInput: {
    position: "absolute", //Here is the trick
    // width: "100%",
    flexDirection: "row",
    marginVertical: 10,
    // top: 680,
    // top: 0,
    // bottom: 0,
    flex: 1,
    left: 0,
    right: 0,
    backgroundColor: "#F4CE14",
    padding: 10,
    justifyContent: "flex-end",
    alignItems: "center",
    marginHorizontal: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "grey",
    paddingHorizontal: 10,
    fontSize: 16,
    height: 40,
    borderRadius: 4,
    paddingVertical: 12,
  },
  button: {
    width: "17%",
    height: 40,
    // backgroundColor: Color.secondaryColor,
    borderRadius: 4,
    alignItems: "center",

    justifyContent: "center",
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
  },
  fontCard: {
    fontSize: 17,
    color: "#fff",
  },
  boxCard: {
    padding: 8,
    marginTop: 6,
    backgroundColor: "#8c8c8c",
    borderRadius: 6,
  },
});
