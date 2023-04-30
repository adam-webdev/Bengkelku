import { Stack, Tabs } from "expo-router";
import Home from "@expo/vector-icons/Octicons";
import Explore from "@expo/vector-icons/MaterialIcons";
import Transaksi from "@expo/vector-icons/FontAwesome5";
import UserIcon from "@expo/vector-icons/FontAwesome";
import Color from "../constants/Color";
export default Layout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Color.primary,
          tabBarInactiveTintColor: "grey",
          tabBarLabelStyle: {
            fontSize: 13,
          },
          tabBarStyle: [
            {
              height: 50,
              paddingVertical: 6,
              display: "flex",
              // activeTintColor: Color.secondaryColor,
              // inactiveTintColor: "grey",
            },
            null,
          ],
        }}
        // tabBarOptions={{
        //   activeTintColor: Color.primary,
        //   inactiveTintColor: "grey",
        // }}
        // options={{
        //   headerTitle: "",
        // }}
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
