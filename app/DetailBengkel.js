import { View, Text, StyleSheet, Image } from "react-native";
import React from "react";
import { useSearchParams } from "expo-router";

const DetailBengkel = () => {
  const { id } = useSearchParams();

  return (
    <View style={styles.container}>
      <View style={styles.boxImage}>
        <Image
          style={styles.image}
          source={require("../assets/img/bengkel.jpg")}
        />
      </View>
      <Text>Bengkel King Motor {id}</Text>
      <Text>DetailBengkel {id}</Text>
    </View>
  );
};

export default DetailBengkel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    // margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 20,
    fontSize: 16,
  },
  boxImage: {
    objectFit: "cover",
    justifyContent: "center",

    alignItems: "center",
  },
  image: {
    width: 350,
    height: 250,
    borderRadius: 10,
  },
});
