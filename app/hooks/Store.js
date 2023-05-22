import { View, Text } from "react-native";
import React, {
  useState,
  useContext,
  useReducer,
  createContext,
  useEffect,
} from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
export const getUserInfo = async () => {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");
    // console.log("getUserInfo", userInfo);
    return userInfo !== null ? JSON.parse(userInfo) : null;
  } catch (error) {
    console.error("Invalid JSON:", error.message);
  }
};
export const getUserLocation = async () => {
  try {
    const userLocation = await AsyncStorage.getItem("userLocation");
    // console.log("getuserLocation", userLocation);
    return userLocation !== null ? JSON.parse(userLocation) : null;
  } catch (error) {
    console.error("Invalid JSON:", error.message);
  }
};

export const getUserToken = async () => {
  try {
    const userToken = await AsyncStorage.getItem("token");
    return userToken !== "" ? userToken : "";
  } catch (error) {
    console.log(error);
  }
};

export const storeData = async (value) => {
  try {
    // const jsonValue = JSON.stringify(value);
    // console.log("json val = ", value.token);
    // console.log("json val user = ", value);
    await AsyncStorage.setItem("userInfo", JSON.stringify(value));
    await AsyncStorage.setItem("token", value.token);
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error("Invalid JSON:", error.message);
    } else {
      throw error;
    }
  }
};

const deleteUserInfo = async () => {
  try {
    await AsyncStorage.removeItem("userInfo");
    // await AsyncStorage.removeItem("token");
  } catch (err) {
    console.log(err);
  }
};

const initialState = {
  userInfo: [],
  userLocation: [],

  // userToken: getUserToken(),
};
const StateContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      // storeData(action.payload);
      return { ...state, ...state.userLocation, userInfo: action.payload };
    }
    case "SAVE_LOCATION": {
      // storeData(action.payload);
      return { ...state, ...state.userInfo, userLocation: action.payload };
    }
    case "LOGOUT": {
      // deleteUserInfo();
      // AsyncStorage.removeItem("userInfo");
      return initialState;
    }

    default:
      return state;
  }
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const router = useRouter();
  const checkLogin = async () => {
    const data = await getUserInfo();
    if (data) {
      dispatch({ type: "LOGIN", payload: data });
      router.replace("/home/HomeScreen");
    } else {
      router.replace("/Login");
    }
  };
  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <StateContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export default Store;

export const useStateContext = () => useContext(StateContext);
