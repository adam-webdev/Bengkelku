import { Alert } from "react-native";

export const showAlert = () => {
  return Alert.alert(
    "Pemesanan Berhasil",
    [
      {
        text: "Cancel",
        onPress: () => Alert.alert("ok"),
        style: "success",
      },
    ]
    // {
    //   text: "iya",
    //   onDismiss: route() =>
    //     Alert.alert(
    //       "This alert was dismissed by tapping outside of the alert dialog."
    //     ),
    // }
  );
};
