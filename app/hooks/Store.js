import { View, Text } from "react-native";
import React, {
  useState,
  useContext,
  useReducer,
  createContext,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getUserInfo = async () => {
  try {
    const userInfo = await AsyncStorage.getItem("userInfo");
    return userInfo !== null ? JSON.parse(userInfo) : [];
  } catch (error) {
    console.log(error);
  }
};

export const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("userInfo", jsonValue.user);
    await AsyncStorage.setItem("token", jsonValue.token);
  } catch (error) {
    console.log(error);
  }
};

const initialState = {
  userInfo: getUserInfo(),
};
const StateContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      storeData(action.payload);
      return { ...state, userInfo: action.payload };
    }
    case "LOGOUT": {
      AsyncStorage.removeItem("userInfo");
      AsyncStorage.removeItem("token");
      return { ...state, userInfo: [] };
    }

    default:
      return state;
  }
};

const Store = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

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
