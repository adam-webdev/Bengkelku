import {
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
  View,
  Text,
  SafeAreaView,
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Link, Stack, useRouter } from "expo-router";

const Home = () => {
  const router = useRouter();
  return (
    <SafeAreaView style={styles.container}>
      {/* Use the `Screen` component to configure the layout. */}
      <Stack.Screen
        screenOptions={{
          headerStyle: {
            backgroundColor: "#0000a7",
          },
          headerShown: false,
        }}
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerStyle: { backgroundColor: "#0000a7" },
        }}
      />
      <MaterialCommunityIcons style={styles.icon} name="garage" size={150} />
      <View style={{ marginTop: 30 }}>
        <Text style={styles.font1}>Selamat Datang Di </Text>
        <Text style={styles.font}>Bengkelku</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          router.push("/Login");
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            color: "#fff",
            fontSize: 24,
          }}
        >
          Mulai
        </Text>
      </TouchableOpacity>
      {/* Use the `Link` compoSnent to enable optimized client-side routing. */}
    </SafeAreaView>
  );
};
export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0000a7",
  },
  font: {
    fontSize: 34,
    color: "#F05D0E",
    fontWeight: 900,
    marginBottom: 10,
  },
  font1: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  button: {
    width: 240,
    backgroundColor: "#F05D0E",
    align: "center",
    padding: 10,
    marginTop: 30,
    borderRadius: 50,
  },
  icon: {
    color: "#fff",
    marginTop: 80,
  },
});
