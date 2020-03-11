import React, { userState, userEffect } from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

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

const Stack = createStackNavigator();

function Home(props) {

    return (
        <View>
            {/* <Stack.Navigator>
                <Stack.Screen name="DrawerNav" component={DrawerNav} />
                <Stack.Screen name="BottomNav" component={BottomNav} />
            </Stack.Navigator> */}
            <Text>This is a dashboard.</Text>
        </View>
    );

    Home.navigationOptions = screenProps => ({
        title: "Dashboard",
        headerStyle: {
            backgroundColor : "blue"
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 24
        }
    });
    
}

export default Home;
