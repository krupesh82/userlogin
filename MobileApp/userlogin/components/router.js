import React from "react";
import { Platform, StatusBar } from "react-native";
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { MaterialCommunityIcons } from "react-native-vector-icons";

import Register from "./screens/auth/register"
import LogIn from "./screens/auth/login";
import Home from "./screens/home";

const headerStyle = {
  marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
};

// const MySignedOut = createStackNavigator();

// function SignedOut() {
//     return (
//       <MySignedOut.Navigator>
//         <MySignedOut.Screen name="LogIn" component={LogIn} />
//         <MySignedOut.Screen name="Register" component={Register} />
//       </MySignedOut.Navigator>
//     );
// }

const MyBottomNav = createBottomTabNavigator();

function BottomNav() {
  return (
    <MyBottomNav.Navigator
      tabBarOptions= {{
        style: {
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
        }
      }}
    >
      <MyBottomNav.Screen 
        name="Home" 
        component= {Home} 
        options= {{
            tabBarLabel: "Dashboard",
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="home" size={30} color={tintColor} />
            )
        }}
      />
      <MyBottomNav.Screen 
        name="Profile" 
        component={Home} 
        options= {{
            tabBarLabel: "Profile",
            tabBarIcon: ({ tintColor }) => (
                <MaterialCommunityIcons name="account" size={30} color={tintColor} />
            )
        }}
      />
    </MyBottomNav.Navigator>
  );
}

const MyDrawerNav = createDrawerNavigator();

function DrawerNav() {
  return (
    <MyDrawerNav.Navigator>
      <MyDrawerNav.Screen
        name="Home"
        component={Home}
        options={{
          drawerLabel: "Dashboard"
        }}
      />
      <MyDrawerNav.Screen
        name="Profile"
        component={Home}
        options={{
          drawerLabel: "Profile"
        }}
      />
      <MyDrawerNav.Screen
        name="Signout"
        component={Home}
        options={{
          drawerLabel: "Signout"
        }}
      />
    </MyDrawerNav.Navigator>
  );
}

// const MySignedIn = createStackNavigator();
// function SignedIn() {
//   return (
//     <MySignedIn.Navigator>
//       <MySignedIn.Screen name="DrawerNav" component={DrawerNav} />
//       <MySignedIn.Screen name="BottomNav" component={BottomNav} />
//     </MySignedIn.Navigator>
//   );
// }
