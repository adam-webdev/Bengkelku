import { View, Text } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Menu = () => {
  return (
    <View>
      <Text>Menu</Text>
      <Link href="/Profile">Profile</Link>
    </View>
  );
};

export default Menu;
