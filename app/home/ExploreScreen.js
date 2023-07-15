import React from "react";
import { StyleSheet, View, Text } from "react-native";
// import Mapbox from "@rnmapbox/maps";

// Mapbox.setAccessToken(
//   "pk.eyJ1IjoiYWNlbmdycGgiLCJhIjoiY2xqbWw5dHBtMTA0dDN0cGJtNGZmMzJidiJ9.Fue2Wxs6TUoFjyBMXgK8Wg"
// );
import { LatLng, LeafletView } from "react-native-leaflet-view";

const ExploreScreen = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <LeafletView
          style={styles.map}

          // The rest of your props, see the list below
        />
      </View>
    </View>
  );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    height: 300,
    width: 300,
  },
  map: {
    flex: 1,
  },
});
