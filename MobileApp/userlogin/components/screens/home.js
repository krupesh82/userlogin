import React, { userState, userEffect } from 'react';
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import Temp2 from "./temp2";
import SignOut from "../screens/auth/signout";

const MyDrawerNav = createDrawerNavigator();

function DrawerNav() {
  return (
    <MyDrawerNav.Navigator>
      <MyDrawerNav.Screen
        name="Home"
        component={Temp2}
        options={{
          drawerLabel: "Dashboard"
        }}
      />
      <MyDrawerNav.Screen
        name="Profile"
        component={Temp2}
        options={{
          drawerLabel: "Profile"
        }}
      />
      <MyDrawerNav.Screen
        name="Signout"
        component={SignOut}
        options={{
          drawerLabel: "Signout"
        }}
      />
    </MyDrawerNav.Navigator>
  );
}

const Stack = createStackNavigator();

function Home(props) {
  return DrawerNav();
  // return BottomNav();
  // return (
  //     // <View>
  //           {/* <Text>This is a dashboard.</Text> */}
  //           // <BottomNav />
  //           {/* <Stack.Navigator>
  //                <Stack.Screen name="Temp1" component={Temp} />
  //                <Stack.Screen name="Temp2" component={Temp} />
  //            </Stack.Navigator> */}
  //           //  </View>
  //   // <MyDrawerNav.Navigator>
  //   //   <MyDrawerNav.Screen
  //   //     name="Home"
  //   //     component={Home}
  //   //     options={{
  //   //       drawerLabel: "Dashboard"
  //   //     }}
  //   //   />
  //   //   <MyDrawerNav.Screen
  //   //     name="Profile"
  //   //     component={Home}
  //   //     options={{
  //   //       drawerLabel: "Profile"
  //   //     }}
  //   //   />
  //   //   <MyDrawerNav.Screen
  //   //     name="Signout"
  //   //     component={Home}
  //   //     options={{
  //   //       drawerLabel: "Signout"
  //   //     }}
  //   //   />
  //   // </MyDrawerNav.Navigator>
  // );
    // return (
    //     <View>
    //         {/* <Stack.Navigator>
    //             <Stack.Screen name="DrawerNav" component={DrawerNav} />
    //             <Stack.Screen name="BottomNav" component={BottomNav} />
    //         </Stack.Navigator> */}
    //         <Text>This is a dashboard.</Text>
    //     </View>
    // );

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
