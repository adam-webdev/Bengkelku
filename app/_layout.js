import { Stack } from "expo-router";
import { SafeAreaView, Text } from "react-native";
import Color from "./constants/Color";
import Store from "./hooks/Store";
const Layout = () => {
  return (
    <Store>
      <Stack
        screenOptions={{
          headerTitle: "",
          headerStyle: {
            backgroundColor: Color.primary,
          },
          headerTintColor: "#fff",
          // gestureEnabled: false,
          // headerShown: true,
          // headerLeft: () => <Text>ada</Text>,
          // headerRight: () => <Text>ada</Text>,
        }}
      />
    </Store>
  );
};
export default Layout;
