import { View, Text } from "react-native";
import React, { useState } from "react";

const useTogglePasswordVisibility = () => {
  const [passwordVisibility, setPasswordVisibilty] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setPasswordVisibilty(!passwordVisibility);
      setRightIcon("eye-off");
    } else if (rightIcon === "eye-off") {
      setPasswordVisibilty(!passwordVisibility);
      setRightIcon("eye");
    }
  };
  return { passwordVisibility, rightIcon, handlePasswordVisibility };
};

export default useTogglePasswordVisibility;
