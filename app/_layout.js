import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";

const Layout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#0000a7",
          },
          headerTintColor: "#fff",
        }}
      />
    </>
  );
};
export default Layout;
