import { View, Text } from "react-native";
import React from "react";
import { useStateContext, getUserInfo } from "./Store";
import { AsyncStorage } from "@react-native-async-storage/async-storage";

const useToken = () => {
  const { state } = useStateContext();

  const tokenApi = state?.userInfo?._j
    ? state?.userInfo?._j?.token
    : state?.userInfo?.user?.token;
  console.log("tokenapi", tokenApi);
  return tokenApi;
};

export default useToken;
