import { View, Text } from "react-native";
import React, {
  useState,
  useContext,
  useReducer,
  createContext,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("userInfo");
    return jsonValue !== null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.log(error);
  }
};

export const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("userInfo", jsonValue);
  } catch (error) {
    console.log(error);
  }
};

const initialState = {
  userInfo: getData(),
};
const StateContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      storeData(action.payload);
      return { ...state, userInfo: action.payload };
    }
    case "LOGOUT": {
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
