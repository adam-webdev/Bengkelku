import { Stack, Tabs } from "expo-router";
import Home from "@expo/vector-icons/Octicons";
import Explore from "@expo/vector-icons/MaterialIcons";
import Transaksi from "@expo/vector-icons/FontAwesome5";
import UserIcon from "@expo/vector-icons/FontAwesome";
import Color from "../constants/Color";
import { useStateContext, getUserInfo } from "./../hooks/Store";
import Chatbot from "@expo/vector-icons/FontAwesome5";

import { useEffect } from "react";
export default Layout = () => {
  const { state, dispatch } = useStateContext();
  // const checkLogin = async () => {
  //   const data = await getUserInfo();
  //   console.log("layout", data);
  //   if (data === null) {
  //     router.push("/Login");
  //   } else {
  //     dispatch({ type: "LOGIN", payload: data });
  //   }
  // };
  // useEffect(() => {
  //   checkLogin();
  // }, []);
  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: Color.primary,
          tabBarInactiveTintColor: "grey",
          tabBarHideOnKeyboard: true,
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
        {/* <Tabs.Screen
          name="MapScreen"
          options={{
            tabBarIcon: ({ color }) => (
              <Explore name="explore" color={color} size={24} />
            ),
            tabBarLabel: "Explore",
          }}
        /> */}
        <Tabs.Screen
          name="TransaksiScreen"
          options={{
            tabBarIcon: ({ color }) => (
              <Transaksi name="exchange-alt" color={color} size={24} />
            ),
            tabBarLabel: "Order",
          }}
        />
        {/* <Tabs.Screen
          name="ChatBot"
          options={{
            tabBarIcon: ({ color }) => (
              <Transaksi name="headset" color={color} size={24} />
            ),
            tabBarLabel: "ChatBot",
          }}
        /> */}
        <Tabs.Screen
          name="ChatbotScreen"
          options={{
            tabBarIcon: ({ color }) => (
              <Chatbot name="headset" color={color} size={24} />
            ),
            tabBarLabel: "Chatbot",
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
