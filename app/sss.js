// import {
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
//   TextInput,
// } from "react-native";
// import React from "react";
// import { Link, useRouter, Stack } from "expo-router";
// import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import HomeNotActive from "@expo/vector-icons/Octicons";
// import HomeActive from "@expo/vector-icons/MaterialIcons";
// // import ArrowLeft from "@expo/vector-icons/AntDesign";
// import { NavigationContainer } from "@react-navigation/native";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import HomeScreen from "./HomeScreen";
// import ProfileScreen from "./ProfileScreen";
// import ExploreScreen from "./ExploreScreen";
// import TransaksiScreen from "./TransaksiScreen";
// import Ionicons from "react-native-vector-icons/Ionicons";
// const HomeLayout = () => {
//   const router = useRouter();
//   const Tab = createBottomTabNavigator();
//   return (
//     <View style={styles.container}>
//       {/* Use the `Screen` component to configure the layout. */}
//       <Stack.Screen
//         screenOptions={{
//           headerShown: false,
//         }}
//         options={{
//           headerTitle: "",
//           headerShadowVisible: false,
//           headerStyle: { backgroundColor: "#fff" },
//         }}
//       />
//       <Tab.Navigator
//         initialRouteName="HomeScreen"
//         screenOptions={({ route }) => ({
//           tabBarIcon: ({ focused, color, size }) => {
//             let iconName;

//             if (route.name === "HomeScreen") {
//               iconName = focused ? (
//                 <HomeNotActive color="#000" />
//               ) : (
//                 <HomeActive color="#000" />
//               );
//             } else if (route.name === "ProfileScreen") {
//               iconName = focused ? (
//                 <HomeNotActive color="#000" />
//               ) : (
//                 <HomeActive color="#000" />
//               );
//             } else if (route.name === "ExploreScreen") {
//               iconName = focused ? (
//                 <HomeNotActive color="#000" />
//               ) : (
//                 <HomeActive color="#000" />
//               );
//             }

//             // You can return any component that you like here!
//             return iconName;
//           },
//         })}
//       >
//         <Tab.Screen name="HomeScreen" component={HomeScreen} />
//         <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
//         <Tab.Screen name="ExploreScreen" component={ExploreScreen} />
//         <Tab.Screen name="TransaksiScreen" component={TransaksiScreen} />
//       </Tab.Navigator>
//       <Text>Home Layout</Text>
//       {/* Use the `Link` compoSnent to enable optimized client-side routing. */}
//     </View>
//   );
// };

// export default HomeLayout;
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: "center",
//     backgroundColor: "#fff",
//   },
//   font: {
//     fontSize: 30,
//     color: "#F05D0E",
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   font1: {
//     fontSize: 30,
//     color: "#fff",
//     fontWeight: "bold",
//     marginBottom: 30,
//   },
//   button: {
//     width: 320,
//     backgroundColor: "#F05D0E",
//     align: "center",
//     padding: 10,
//     marginTop: 10,
//     borderRadius: 50,
//   },
//   input: {
//     width: 320,
//     color: "#fff",
//     margin: 14,
//     fontSize: 18,
//     borderColor: "#fff",
//     borderWidth: 1,
//     padding: 12,
//     borderRadius: 50,
//   },
//   linkRegister: {
//     fontSize: 16,
//     color: "#fff",
//     marginTop: 10,
//   },
//   linkDaftar: {
//     color: "#F05D0E",
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   icon: {
//     color: "#fff",
//     marginTop: 80,
//   },
// });
