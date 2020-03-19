import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SignIn from "../screens/auth/signin";
import SignUp from "../screens/auth/signup";
import PasswordReset from "../screens/auth/passwordreset";

const AuthStack = createStackNavigator();
export const AuthStackScreen = ({route}) => (
  <AuthStack.Navigator>
    <AuthStack.Screen
        name="SignIn"
        component={SignIn}
        initialParams={{ message: route.params?.message }}
        options={{
        title: 'Sign in',
        }}
    />
    <AuthStack.Screen
        name="PasswordReset"
        component={PasswordReset}
        options={{
        title: 'Reset Password',
        }}
    />
    <AuthStack.Screen
        name="SignUp"
        component={SignUp}
        options={{
        title: 'Sign Up',
        }}
    />
  </AuthStack.Navigator>
);
