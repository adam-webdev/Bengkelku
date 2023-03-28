import { Stack, Tabs } from "expo-router";
import HomeNotActive from "@expo/vector-icons/Octicons";
import HomeActive from "@expo/vector-icons/MaterialIcons";
export default () => {
  return (
    <Tabs screenOptions={{ tabBarShowLabel: false }}>
      <Tabs.Screen
        name="HomeScreen"
        options={{
          tabBarIcon: ({ color }) => (
            <HomeNotActive name="home" color={color} size={24} />
          ),
        }}
      />
    </Tabs>
  );
};
