import { Stack, Tabs } from "expo-router";
import Home from "@expo/vector-icons/Octicons";
import Explore from "@expo/vector-icons/MaterialIcons";
import Transaksi from "@expo/vector-icons/FontAwesome5";
import UserIcon from "@expo/vector-icons/FontAwesome";
export default Layout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 14,
          },
          tabBarStyle: [
            {
              height: 50,
              paddingVertical: 8,
              activeTintColor: "#0000a7",
              inactiveTintColor: "grey",
            },
          ],
        }}
        options={{
          headerTitle: "",
        }}
      >
        <Tabs.Screen
          name="HomeScreen"
          options={{
            tabBarIcon: ({ color }) => (
              <Home name="home" color={color} size={24} />
            ),
            tabBarLabel: "Home",
          }}
        />
        <Tabs.Screen
          name="ExploreScreen"
          options={{
            tabBarIcon: ({ color }) => (
              <Explore name="explore" color={color} size={24} />
            ),
            tabBarLabel: "Explore",
          }}
        />
        <Tabs.Screen
          name="TransaksiScreen"
          options={{
            tabBarIcon: ({ color }) => (
              <Transaksi name="exchange-alt" color={color} size={24} />
            ),
            tabBarLabel: "Transaksi",
          }}
        />
        <Tabs.Screen
          name="ProfileScreen"
          options={{
            tabBarIcon: ({ color }) => (
              <UserIcon name="user-circle-o" color={color} size={24} />
            ),
            tabBarLabel: "Saya",
          }}
        />
      </Tabs>
    </>
  );
};
