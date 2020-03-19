import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { CommonActions } from '@react-navigation/native';
import { AuthContext } from "../../context";

export default function SignOut({ navigation, route }) {
    const { signOut } = React.useContext(AuthContext);

    React.useEffect(() => {signOut();}, []);
    
    return null;
}
