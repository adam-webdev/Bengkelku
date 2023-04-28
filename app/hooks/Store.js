import { View, Text } from "react-native";
import React, {
  useState,
  useContext,
  useReducer,
  createContext,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";

const initialState = {
  userInfo: [],
};
const StateContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN": {
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
