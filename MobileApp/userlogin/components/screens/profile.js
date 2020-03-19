import React, { useState, useEffect } from 'react';
import { StyleSheet, TextInput, Text, View, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default function MyProfile({ navigation, route }) {
    // const userToken = await AsyncStorage.getItem('userToken');
    return (
        <View>
            <Text> </Text>
            <Text>This is a profile screen.</Text>
           
        </View>
    );

    MyProfile.navigationOptions = screenProps => ({
        title: "My Profile",
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