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
          source={require("../../assets/img/bengkel.jpg")}
        />
      </View>
      <Text>DetailBengkel {id}</Text>
    </View>
  );
};

export default DetailBengkel;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    margin: 10,
    fontSize: 16,
  },
  boxImage: {
    width: 300,
    height: 300,
  },
  image: {
    width: 300,
    objectFit: "contain",
  },
});
