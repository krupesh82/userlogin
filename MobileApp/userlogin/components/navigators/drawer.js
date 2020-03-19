import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {TabsScreen} from "./bottomtabs";
import MyProfile from '../screens/profile';
import SignOut from '../screens/auth/signout';
import ChangePassword from '../screens/auth/changepassword';

const Drawer = createDrawerNavigator();
export const DrawerScreen = () => (
  <Drawer.Navigator initialRouteName="Profile">
    <Drawer.Screen name="Profile" component={MyProfile} />
    <Drawer.Screen name="ChangePassword" component={ChangePassword} />
    <Drawer.Screen name="SignOut" component={SignOut} />
  </Drawer.Navigator>
);