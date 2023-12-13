import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "expo-router";
import { AirbnbRating } from "@rneui/themed";
import Color from "./constants/Color";
import { baseUrl, useStateContext } from "./hooks/Store";

const Ulasan = () => {
  const { bengkel_id, user_id } = useSearchParams();
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [ratings, setRatings] = useState("");
  const { state } = useStateContext();

  const router = useRouter();
  const finishRating = (rating) => {
    setRatings(rating);
    console.log("Rating ", rating);
  };
  const showAlert = () =>
    Alert.alert("Berhasil", "Ulasan berhasil dikirim", [
      // {
      //   text: "OK",
      //   onPress: () => Alert.alert("ok"),
      //   style: "OK",
      // },
      {
        text: "tutup",
        onPress: async () => {
          try {
            router.push("/home/HomeScreen");
          } catch (error) {
            console.log("logout error", error);
          }
        },
      },
    ]);
  const sendUlasan = async () => {
    try {
      console.log("Bengkel id", bengkel_id);
      console.log("User id", user_id);
      console.log("Rating", ratings);
      console.log("Text ", text);
      setLoading(true);
      const request = await fetch(`${baseUrl}/ulasan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + state?.userInfo?.token,
        },
        body: JSON.stringify({
          bengkel_id,
          user_id,
          ulasan: text,
          angka_ulasan: ratings,
        }),
      });
      console.log("selesai");
      const response = await request.json();
      console.log("response ulasan : " + response);
      setLoading(false);
      showAlert();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.judul}>
        Terima Kasih Sudah Menggunakan Jasa Layanan Bengkel Kami. Berikan
        Penilaian Dan Masukan Untuk Memperbaiki Kualitas Pelayanan Kami.
      </Text>
      <AirbnbRating
        style={styles.rating}
        // showRating={true}
        defaultRating={1}
        size={30}
        fractions={5}
        reviews={["Tidak Puas", "Kurang Puas", "Baik", "Puas", "Sangat Puas"]}
        onFinishRating={finishRating}
        startingValue={1}
      />
      <TextInput
        style={styles.input}
        multiline={true}
        underlineColorAndroid="transparent"
        textAlignVertical="top"
        placeholder="Ketikan sesuatu..."
        numberOfLines={6}
        value={text}
        onChangeText={(text) => setText(text)}
      />
      <Pressable
        disabled={loading}
        onPress={() => sendUlasan()}
        style={styles.button}
      >
        <Text style={styles.fontButton}>Kirim</Text>
      </Pressable>
    </View>
  );
};

export default Ulasan;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    flex: 1,
  },
  judul: {
    fontSize: 16,
    marginBottom: 60,
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    fontSize: 16,
    paddingVertical: 10,
    backgroundColor: Color.primary,
  },
  fontButton: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
  },
  rating: {
    marginTop: 20,
  },
});
