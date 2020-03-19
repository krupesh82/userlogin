import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Home from '../screens/home';
import {DrawerScreen} from './drawer';

const Tabs = createBottomTabNavigator();

export const TabsScreen = () => (
    <Tabs.Navigator>
      <Tabs.Screen name="Home" component={DrawerScreen} options= {{tabBarLabel: "Home"}} />
      <Tabs.Screen name="Search" component={Home} options= {{tabBarLabel: "Search"}} />
    </Tabs.Navigator>
  );