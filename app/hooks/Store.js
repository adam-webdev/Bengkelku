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
    console.log("getUserInfo", userInfo);
    return userInfo !== null ? JSON.parse(userInfo) : null;
  } catch (error) {
    if (error instanceof SyntaxError) {
      console.error("Invalid JSON:", error.message);
    } else {
      throw error;
    }
  }
};
// export const getUserToken = async () => {
//   try {
//     const userToken = await AsyncStorage.getItem("token");
//     return userToken !== "" ? userToken : "";
//   } catch (error) {
//     console.log(error);
//   }
// };

export const storeData = async (value) => {
  try {
    // const jsonValue = JSON.stringify(value);
    console.log("json val = ", value);
    console.log("json val user = ", value.user);
    await AsyncStorage.setItem("userInfo", JSON.stringify(value));
    // await AsyncStorage.setItem("token", value.token);
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
  } catch (err) {
    console.log(err);
  }
};

const initialState = {
  userInfo: getUserInfo(),
  // userToken: getUserToken(),
};
const StateContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
      storeData(action.payload);
      return { ...state, userInfo: action.payload };
    }
    case "LOGOUT": {
      deleteUserInfo();
      // AsyncStorage.removeItem("userInfo");
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
