import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import React from "react";
const Card = () => {
  return (
    <TouchableHighlight>
      <View
        style={{
          backgroundColor: "#fff",
          padding: 10,
          flexDirection: "row",
          gap: 5,
          alignItems: "center",
        }}
      >
        <Image
          style={{ width: 100, height: 100 }}
          source={require("../../assets/banner/banner.png")}
        />
        <View style={{ gap: 5 }}>
          <Text style={{ fontSize: 16, fontWeight: "bold" }}>
            Bengkel King Motor
          </Text>
          <Text>Bekasi, Jawa Barat</Text>
          <Text style={{ color: "grey", fontSize: 12 }}>Jarak 100 meter</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};
const HomeScreen = () => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <ScrollView>
      <View style={styles.banner}>
        <Text style={styles.judul}>
          Selamat Datang{" "}
          <Text style={{ fontWeight: "bold", fontSize: 18 }}>Adam</Text>
        </Text>
        <Image
          style={styles.imageBanner}
          resizeMode="cover"
          source={require("../../assets/banner/banner.png")}
        />
        <TouchableOpacity style={styles.button}>
          <Text style={{ color: "#fff", fontSize: 18 }}>Cari sekarang</Text>
        </TouchableOpacity>
      </View>

      <View style={{ padding: 10, gap: 10 }}>
        <Text>Rekomendasi untuk anda :</Text>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  banner: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  judul: {
    fontSize: 16,
  },
  imageBanner: {
    width: 400,
    objectFit: "contain",
    height: 200,
  },
  button: {
    justifyContent: "center",
    alignItem: "center",
    paddingVertical: 10,
    paddingHorizontal: 34,
    backgroundColor: "#0000a7",
    color: "#fff",
    marginHorizontal: 20,
    borderRadius: 50,
  },
});
