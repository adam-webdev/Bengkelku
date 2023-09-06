import React from "react";
import { TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

const ZoomButton = (props) => {
  const { onPress, color, style, name } = props;

  return (
    <TouchableOpacity activeOpacity={0.7} style={style} onPress={onPress}>
      <Icon
        name={name}
        type="material-icons"
        size={40}
        color={color}
        raised
        containerStyle={{ width: 50, height: 50, borderRadius: 31 }}
      />
    </TouchableOpacity>
  );
};

export default ZoomButton;
