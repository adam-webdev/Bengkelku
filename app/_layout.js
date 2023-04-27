import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import Color from "./constants/Color";
const Layout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: Color.primary,
          },
          headerTintColor: "#fff",
        }}
      />
    </>
  );
};
export default Layout;
