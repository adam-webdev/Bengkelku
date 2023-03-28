import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Avatar } from "react-native-elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Post from "./../screens/Post";
import Reels from "./../screens/Reels";
import Search from "./../screens/Search";
import Shop from "./../screens/Shop";
import Home from "./../screens/Home";
import HomeActive from "../images/svg/HomeActive.svg";
import HomeNotActive from "../images/svg/Home.svg";
import ReelsNotActive from "../images/svg/Reels.svg";
import ReelsActive from "../images/svg/ReelsActive.svg";
import SearchIcon from "react-native-vector-icons/Ionicons";
import Bag from "react-native-vector-icons/MaterialCommunityIcons";
import Profile from "./../screens/Profile";

const Tab = createBottomTabNavigator();
const screenOptions = {
  headerShown: false,
};

const TabIcon = (route, focused) => {
  let iconName;
  if (route.name === "Home") {
    iconName = focused ? <HomeActive /> : <HomeNotActive />;
  } else if (route.name === "Reels") {
    iconName = focused ? <ReelsActive /> : <ReelsNotActive />;
  } else if (route.name === "Search") {
    iconName = focused ? (
      <SearchIcon size={26} color="#000" name="search" />
    ) : (
      <SearchIcon size={26} color="#000" name="search-outline" />
    );
  } else if (route.name === "Shop") {
    iconName = focused ? (
      <Bag size={26} color="#000" name="shopping" />
    ) : (
      <Bag size={26} color="#000" name="shopping-outline" />
    );
  } else if (route.name === "Profile") {
    iconName = focused ? (
      <Avatar
        containerStyle={{
          borderColor: "black",
          borderStyle: "solid",
          borderWidth: 3,
        }}
        rounded
        size={34}
        source={require("../images/avatar.jpg")}
      />
    ) : (
      <Avatar rounded size={34} source={require("../images/avatar.jpg")} />
    );
  }
  return iconName;
};

const TabBottom = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarIcon: ({ focused, size }) => TabIcon(route, focused),
        tabBarStyle:
          route.name === "Reels"
            ? { backgroundColor: "black", color: "#fff" }
            : { backgroundColor: "#fff" },
      })}
      initialRouteName="Home"
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Reels" component={Reels} />
      <Tab.Screen name="Shop" component={Shop} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default TabBottom;

const styles = StyleSheet.create({});
